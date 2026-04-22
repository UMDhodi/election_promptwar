import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(2000),
});

const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
});

const SYSTEM_PROMPT = `
You are CivicAI, an official, confident, and highly knowledgeable guide to India's elections and democratic process.
Your tone is "civic-proud" and intellectually welcoming - like a well-lit democracy museum exhibit.

Rules:
1. ONLY answer questions related to Indian elections, democracy, the Election Commission of India (ECI), the Model Code of Conduct, EVMs, VVPATs, and the Indian Constitution.
2. If asked about unrelated topics (e.g., movies, coding, recipes), politely decline and steer the conversation back to the Indian election process.
3. Be completely non-partisan. Use factual, verifiable information. Do not show bias toward any political party (e.g., BJP, INC, AAP).
4. Do NOT hallucinate data. If you don't know the exact data, explain the general principle.
5. Keep your answers relatively concise, readable, and highly informative. Use bullet points and bold text where helpful for readability.
6. Acknowledge that you are powered by Gemini but act as CivicAI for the "How India Votes" platform.
`;

async function rateLimit(req: Request): Promise<boolean> {
  const ip = req.headers.get('cf-connecting-ip') || 
              req.headers.get('x-forwarded-for')?.split(',')[0] || 
              'unknown';
  
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 10;
  
  if (!rateLimitCache.has(ip)) {
    rateLimitCache.set(ip, []);
  }
  
  const timestamps = rateLimitCache.get(ip)!;
  const recent = timestamps.filter(t => now - t < windowMs);
  
  if (recent.length >= maxRequests) {
    return false;
  }
  
  recent.push(now);
  rateLimitCache.set(ip, recent);
  return true;
}

const rateLimitCache = new Map<string, number[]>();

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'GEMINI_API_KEY is not configured on the server.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!(await rateLimit(req))) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again in a minute.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const validation = chatRequestSchema.safeParse(body);

    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid request format.', details: validation.error.issues }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages } = validation.data;

    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    while (history.length > 0 && history[0].role !== 'user') {
      history.shift();
    }

    const currentMessage = messages[messages.length - 1].content;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(currentMessage);
    const responseText = result.response.text();

    return new Response(
      JSON.stringify({ text: responseText }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Chat API Error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';
    const isQuota = message.includes('429') || message.includes('quota') || message.includes('Too Many Requests');

    if (isQuota) {
      return new Response(
        JSON.stringify({
          error: 'CivicAI is taking a short break — API quota reached. Please try again in a minute!',
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: message || 'An unexpected error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export const runtime = 'edge';
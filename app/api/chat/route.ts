import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'GEMINI_API_KEY is not configured on the server.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid request format. 'messages' array required." }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Build conversation history in Gemini format
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Gemini requires history to start with a 'user' turn
    while (history.length > 0 && history[0].role !== 'user') {
      history.shift();
    }

    const currentMessage = messages[messages.length - 1].content;

    // gemini-2.5-flash — latest & most capable model available on this key
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
  } catch (error: any) {
    console.error('Chat API Error:', error);

    const msg: string = error?.message ?? '';
    const isQuota = msg.includes('429') || msg.includes('quota') || msg.includes('Too Many Requests');

    if (isQuota) {
      return new Response(
        JSON.stringify({
          error: 'CivicAI is taking a short break — API quota reached. Please try again in a minute!',
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: msg || 'An unexpected error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, collection, addDoc, getDocs, orderBy, limit, query } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === 'undefined') return null;
  
  if (!app && getApps().length === 0) {
    try {
      app = initializeApp(firebaseConfig);
    } catch {
      return null;
    }
  }
  return app || getApps()[0] || null;
}

export function getFirebaseDb(): Firestore | null {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  
  if (!db) {
    try {
      db = getFirestore(firebaseApp);
    } catch {
      return null;
    }
  }
  return db;
}

export interface QuizScore {
  playerName: string;
  score: number;
  totalQuestions: number;
  timestamp: number;
}

export interface SaveScoreInput {
  playerName: string;
  score: number;
  totalQuestions: number;
}

export async function saveQuizScore(input: SaveScoreInput): Promise<string | null> {
  const database = getFirebaseDb();
  if (!database) return null;

  try {
    const scoreWithTimestamp: QuizScore = {
      ...input,
      timestamp: Date.now(),
    };
    const docRef = await addDoc(collection(database, 'quiz_scores'), scoreWithTimestamp);
    return docRef.id;
  } catch {
    return null;
  }
}

export async function getLeaderboard(limitCount: number = 10): Promise<QuizScore[]> {
  const database = getFirebaseDb();
  if (!database) return [];

  try {
    const q = query(
      collection(database, 'quiz_scores'),
      orderBy('score', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as QuizScore);
  } catch {
    return [];
  }
}

export function isFirebaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  );
}
import { GoogleGenAI } from "@google/genai";

const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || ''; // Use VITE_ since this is a client-side app right now

// NOTE: Using Gemini API key in client is insecure, but a server isn't set up yet for this example.
export const genAI = new GoogleGenAI({ apiKey: apiKey });

export const getModel = () => {
    return 'gemini-2.5-flash';
};

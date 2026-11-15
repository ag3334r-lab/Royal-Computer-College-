import { GoogleGenAI } from "@google/genai";

const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

export const hasGeminiApiKey = Boolean(apiKey);
export const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getModel = () => {
  return 'gemini-2.5-flash';
};

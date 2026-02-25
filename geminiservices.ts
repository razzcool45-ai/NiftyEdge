import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

export interface ConcallAnalysis {
  company: string;
  guidance: "Aggressive" | "Conservative" | "Neutral";
  walkTheTalkScore: number;
  keyTakeaways: string[];
  risks: string[];
  sentiment: string;
}

export async function analyzeConcall(transcript: string): Promise<ConcallAnalysis> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this transcript: ${transcript.substring(0, 20000)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          company: { type: Type.STRING },
          guidance: { type: Type.STRING },
          walkTheTalkScore: { type: Type.NUMBER },
          keyTakeaways: { type: Type.ARRAY, items: { type: Type.STRING } },
          risks: { type: Type.ARRAY, items: { type: Type.STRING } },
          sentiment: { type: Type.STRING },
        },
        required: ["company", "guidance", "walkTheTalkScore", "keyTakeaways", "risks", "sentiment"],
      },
    },
  });
  return JSON.parse(response.text || "{}");
}
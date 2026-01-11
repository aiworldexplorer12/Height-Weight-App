
import { GoogleGenAI, Type } from "@google/genai";
import { HealthData, AIInsight } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getHealthInsights = async (data: HealthData): Promise<AIInsight> => {
  const prompt = `
    Provide professional health insights for a ${data.age}-year-old ${data.gender} with a height of ${data.heightCm} cm.
    Include a summary of why maintaining an ideal weight is important for this specific profile.
    Provide 3 specific nutritional tips, 3 physical activity suggestions, and a general recommendation list.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          nutritionalTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          activitySuggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["summary", "recommendations", "nutritionalTips", "activitySuggestions"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

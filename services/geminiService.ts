
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Fix: Use process.env.API_KEY directly in the client initialization inside functions 
// to ensure the latest key is always used.

export const getAquariumAdvice = async (userPrompt: string, history: ChatMessage[]) => {
  // Fix: Initializing GoogleGenAI client with correct named parameter
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const contents = history.map(h => ({
    role: h.role,
    parts: [{ text: h.content }]
  }));
  contents.push({ role: 'user', parts: [{ text: userPrompt }] });

  // Fix: Calling generateContent directly with model name
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents,
    config: {
      systemInstruction: "You are a world-class aquatics expert named AquaAI. You help users with fish care, tank chemistry, plant maintenance, and equipment troubleshooting. Be friendly, professional, and provide actionable advice. Keep responses concise for mobile viewing.",
    }
  });

  // Fix: Accessing generated text via the .text property
  return response.text;
};

export const identifyFish = async (base64Image: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: "Identify this fish or aquatic life. Provide the common name, scientific name, care difficulty (Easy, Medium, Hard), and one fun fact. Format the response as a clear description." }
      ]
    }
  });

  return response.text;
};

export const generateTankConcept = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `A photorealistic, high-quality cinematic shot of a professional aquascaped aquarium. Style: ${prompt}. Crystal clear water, lush plants, natural stones, driftwood, schooling small colorful tropical fish, high-end lighting, minimalist tank design.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    }
  });

  // Fix: Iterating through parts to correctly find the image data for nano banana models
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

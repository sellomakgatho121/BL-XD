import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
// Using Gemini 3.1 Pro Preview as requested for latest features
export const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "dummy-key");

export const model = genAI.getGenerativeModel({ 
  model: "gemini-3.1-pro-preview",
  generationConfig: {
    responseMimeType: "application/json",
  }
});

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
// Using Gemini 1.5 Flash for speed and cost-efficiency (free tier eligible)
export const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "dummy-key");

export const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  }
});

import { model } from "./gemini";

interface LeadData {
  name: string;
  email: string;
  business_name?: string;
  budget_range?: string;
  message: string;
  business_type?: string;
}

export interface LeadScoreResult {
  score: number;
  category: 'hot' | 'warm' | 'cold' | 'spam';
  analysis: {
    factors: string[];
    intent: string;
    suggested_action: string;
  };
}

export async function analyzeLead(lead: LeadData): Promise<LeadScoreResult> {
  if (!process.env.GOOGLE_API_KEY) {
    console.warn("GOOGLE_API_KEY not set, returning mock score");
    return {
      score: 50,
      category: 'warm',
      analysis: {
        factors: ["Mock analysis (API key missing)"],
        intent: "Unknown",
        suggested_action: "Check environment variables"
      }
    };
  }

  const prompt = `
    Analyze this web design lead for Blacklight Web Designs (agency focusing on high-end agentic AI systems, sprints, and WhatsApp commerce).
    
    Lead:
    Name: ${lead.name}
    Business: ${lead.business_name || 'N/A'} (${lead.business_type || 'N/A'})
    Budget: ${lead.budget_range || 'N/A'}
    Message: ${lead.message}
    
    Scoring Criteria:
    - HOT (80-100): High budget (R50k+), specific AI/Agentic interest, clear business case.
    - WARM (50-79): Moderate budget, standard web needs, some ambiguity.
    - COLD (20-49): Low budget, vague request, student projects.
    - SPAM (0-19): Nonsense, SEO spam, solicitation.

    Output JSON strictly (no markdown blocks):
    {
      "score": number,
      "category": "hot" | "warm" | "cold" | "spam",
      "analysis": {
        "factors": ["list", "of", "key", "factors"],
        "intent": "summary of user intent",
        "suggested_action": "specific next step"
      }
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Clean up potential markdown code blocks if Gemini adds them despite prompt
    const jsonString = text.replace(/```json\n?|\n?```/g, "").trim();
    
    return JSON.parse(jsonString) as LeadScoreResult;
  } catch (error) {
    console.error("Lead scoring error:", error);
    return {
      score: 0,
      category: 'cold',
      analysis: {
        factors: ["Analysis failed"],
        intent: "Error",
        suggested_action: "Manual review required"
      }
    };
  }
}


import { GoogleGenAI } from "@google/genai";

// Fix: Strictly following @google/genai guidelines for initialization and usage.
export class GeminiService {
  // Always use process.env.API_KEY directly.
  private get ai() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async analyzeBantIntent(data: any) {
    const prompt = `Analyze this B2B lead data for BANT (Budget, Authority, Need, Timeline) qualification. 
    Data: ${JSON.stringify(data)}
    
    Respond in JSON format with:
    1. intentScore (0-100)
    2. bantStatus ("qualified", "partial", "unqualified")
    3. summary (concise paragraph)
    4. gaps (what information is missing?)`;

    try {
      // Fix: Use ai.models.generateContent with both model name and prompt.
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      });
      // Fix: response.text is a property, not a method.
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini BANT Error:", error);
      return { 
        intentScore: 50, 
        bantStatus: 'partial', 
        summary: "Analysis currently unavailable.",
        gaps: []
      };
    }
  }

  async getAiConsultancy(query: string) {
    const prompt = `You are a world-class AI Business Consultant for BantConfirm, an Indian B2B marketplace. 
    Help the user find the best IT, Software, or Telecom solution based on their requirements. 
    Keep it professional, data-driven, and brief.
    Query: ${query}`;

    try {
      // Fix: Use ai.models.generateContent with both model name and prompt.
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      // Fix: response.text is a property.
      return response.text;
    } catch (error) {
      console.error("Gemini Consultancy Error:", error);
      return "I'm having trouble connecting right now. Please try again or contact our sales team.";
    }
  }
}

export const geminiService = new GeminiService();

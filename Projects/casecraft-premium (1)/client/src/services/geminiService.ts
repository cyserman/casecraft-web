
import { GoogleGenAI } from "@google/genai";
import { NotebookSchema } from "../types/ingestor";

const SCHEMA_PROMPT = `
You are an expert knowledge management assistant specialized in high-density knowledge transfer (Antigravity RAG).
Analyze the provided document and extract a structural schema.

Requirements:
1. Core thematic structure and key entities.
2. Primary logical claims.
3. 'semanticBriefing': High-Density Markdown representation (for other LLMs).
4. 'expertPersona': Synthesize a MASTER SYSTEM PROMPT for an LLM (like Claude 3.5 or Opus 4.5). 
   This prompt should 'install' the knowledge of this document into the model. 
   Use XML tags (<context>, <role>, <knowledge_base>) in the expertPersona field.
   Instruction the model to act as a world-class expert on specifically this document's subject matter.

Return strictly as a JSON object matching the requested schema.
`;

export async function generateSchema(text: string, fileName: string): Promise<NotebookSchema> {
    // Use Vite env var or fallback
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    if (!apiKey) {
        throw new Error("Missing VITE_GOOGLE_API_KEY. Please set this in your environment.");
    }

    const ai = new GoogleGenAI({ apiKey });

    // Truncate text if too long (simple protection, though 1.5 Pro handles 1M+)
    const content = `Document Title: ${fileName}\n\nContent:\n${text.substring(0, 100000)}`;

    const response = await ai.models.generateContent({
        model: "gemini-1.5-pro",
        contents: { parts: [{ text: content }] },
        config: {
            systemInstruction: { parts: [{ text: SCHEMA_PROMPT }] },
            responseMimeType: "application/json",
            responseSchema: {
                type: "object",
                properties: {
                    title: { type: "string" },
                    summary: { type: "string" },
                    documentType: { type: "string" },
                    author: { type: "string" },
                    keywords: { type: "array", items: { type: "string" } },
                    entities: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                type: { type: "string" },
                                description: { type: "string" }
                            },
                            required: ["name", "type", "description"]
                        }
                    },
                    keyClaims: { type: "array", items: { type: "string" } },
                    structure: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                section: { type: "string" },
                                topics: { type: "array", items: { type: "string" } }
                            }
                        }
                    },
                    logicalRelationships: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                from: { type: "string" },
                                to: { type: "string" },
                                relationship: { type: "string" }
                            }
                        }
                    },
                    semanticBriefing: { type: "string" },
                    expertPersona: { type: "string" }
                },
                required: ["title", "summary", "documentType", "keywords", "entities", "keyClaims", "structure", "logicalRelationships", "semanticBriefing", "expertPersona"]
            }
        }
    });

    // The response is already the text content in this version
    const responseText = typeof response === 'string' ? response :
        response?.text ||
        JSON.stringify(response);

    return JSON.parse(responseText);
}

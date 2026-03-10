import { SERVER_API, AI_API } from "@/const";
import type { AITool, AIToolError } from "@/types";

export const generateAIDescription = async (name: string): Promise<{ response: string }> => {
  const response = await fetch(`${AI_API}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "glm-4.7:cloud",
      prompt: `Generate description for AI tool ${name}. Concise and laconic. Max 100 characters. In case the tool is unknown - tell it. Don't add any additional information. No markdown.`,
      stream: false,
    }),
  });

  return response.json();
};

export const getAITools = async (): Promise<AITool[] | AIToolError> => {
  try {
    const response = await fetch(`${SERVER_API}/tools`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    return response.json();
  } catch (error) {
    console.log("Error catch", error);
    return { response: "Error" };
  }
};




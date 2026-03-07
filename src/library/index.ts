export const generateAIDescription = async (name: string): Promise<{ response: string }> => {
  const response = await fetch("http://localhost:11434/api/generate", {
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

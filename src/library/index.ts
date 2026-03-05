export const generateAIDescription = async () => {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "",
      prompt: "generate description for AI tool",
      stream: false,
    }),
  });

  const data = await response.json();
  return data.response as string;
};

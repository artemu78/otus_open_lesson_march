import { create } from 'zustand'

export interface IAITool {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
}

type Store = {
  aiTools: IAITool[]
  addAITool: (tool: Omit<IAITool, 'id'>) => IAITool
  removeAITool: (id: string) => void
}

export const useStore = create<Store>()((set) => ({
  aiTools: [],
  addAITool: (tool) => {
    const newTool = { ...tool, id: crypto.randomUUID() };
    set((state) => ({
      aiTools: [...state.aiTools, newTool]
    }));
    return newTool;
  },
  removeAITool: (id) => set((state) => ({
    aiTools: state.aiTools.filter((tool) => tool.id !== id)
  }))
}))
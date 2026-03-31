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
  addAIToolStore: (tool: IAITool) => IAITool
  deleteAIToolStore: (id: string) => void
}

export const useStore = create<Store>()((set) => ({
  aiTools: [],
  addAIToolStore: (newTool) => {

    set((state) => {
      if (state.aiTools.findIndex((tool) => tool["id"] === newTool.id) === -1)
        return { aiTools: [...state.aiTools, newTool] }
      else
        return { aiTools: [...state.aiTools] }
    });
    return newTool;
  },
  deleteAIToolStore: (id) => set((state) => ({
    aiTools: state.aiTools.filter((tool) => tool.id !== id)
  }))
}))
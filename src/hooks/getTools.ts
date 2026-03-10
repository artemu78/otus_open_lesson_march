import { useEffect } from "react";
import { getAITools } from "@/library/index";
import { useStore } from "@/store";
import type { AITool, AIToolError } from "@/types";

type toolsResponse = AITool[] | AIToolError

export const useGetTools = () => {
    const { addAITool } = useStore();
    useEffect(() => {
        getAITools().then((tools: toolsResponse) => {
            if (isError(tools)) return null;
            tools.map(tool => {
                addAITool(tool);
            })

        })
    }, []);
}

const isError = (responseObj: toolsResponse): responseObj is AIToolError => {
    return Object.hasOwn(responseObj, "response");
}
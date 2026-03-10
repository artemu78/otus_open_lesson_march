export interface AITool {
    id: string;
    name: string;
    description: string;
    icon: string;
    url: string;
}

export interface AIToolError {
    response: string;
}
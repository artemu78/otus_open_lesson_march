import { Link } from "react-router";
import { useStore } from "@/store";
import { URL_BASE } from "@/const";
import type { AITool } from "@/types";

export const ToolsList = () => {
    const { aiTools } = useStore()
    if (aiTools?.length === 0) return <EmptyBox />
    const list = aiTools.map((tool: AITool) => (<AITool tool={tool} key={tool.id} />))
    return (
        <div className="flex flex-col gap-4">
            {list}
        </div>
    );
}

const EmptyBox: React.FC = () => {
    return (
        <div className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-800 text-slate-500 bg-slate-900/30">
            No tools added yet. Use the form to get started.
        </div>
    )
}

const AITool = ({ tool }: { tool: AITool }) => {
    return (
        <Link
            to={`/${tool.id}`}
            className="p-4 rounded-xl bg-white/5 border border-white/10 flex gap-4 items-center transition-all hover:bg-white/10 hover:translate-x-1"
        >
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-white/5 shadow-inner">
                <img
                    src={tool.icon}
                    alt={tool.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = `${URL_BASE}/vite.svg`
                    }}
                />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-slate-100 truncate">{tool.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                    {tool.description}
                </p>
            </div>
        </Link>
    )
}
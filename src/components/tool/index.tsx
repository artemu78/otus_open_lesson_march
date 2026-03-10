import { useStore } from "@/store";
import { Link } from "react-router";
import { URL_BASE } from "@/const";

export const Tool = ({ id }: { id: string }) => {
    const { aiTools } = useStore()
    const tool = aiTools.find((tool) => tool.id === id)

    if (!tool) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-400 gap-4">
                <p className="text-xl">Tool not found</p>
                <Link to="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                    Return to Library
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <Link to="/" className="inline-flex items-center text-slate-400 hover:text-slate-200 mb-8 transition-colors gap-2 group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Library
            </Link>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                    <div className="w-32 h-32 rounded-3xl overflow-hidden bg-slate-800 border-2 border-white/10 shadow-2xl flex-shrink-0">
                        <img
                            src={tool.icon}
                            alt={tool.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = `${URL_BASE}/vite.svg`;
                            }}
                        />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-4xl font-bold text-slate-100 mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            {tool.name}
                        </h2>
                        <p className="text-lg text-slate-300 leading-relaxed mb-8">
                            {tool.description}
                        </p>

                        <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-95"
                        >
                            Open Tool Website
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
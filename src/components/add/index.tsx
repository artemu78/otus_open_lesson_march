import { useActionState, useEffect, useRef, useState, use, Suspense } from "react";
import { useNavigate } from "react-router";
import { useStore } from "../../store";
import { generateAIDescription } from "@/library";

interface IFormState {
    error?: string;
    success?: boolean;
    toolId?: string;
}

export const AddAIToolForm = () => {
    const { addAITool } = useStore();
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [aiPromise, setAiPromise] = useState<Promise<string> | null>(null);

    const handleGenerateAI = () => {
        setAiPromise(generateAIDescription());
    };

    const action = async (_prevState: IFormState, formData: FormData): Promise<IFormState> => {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const icon = formData.get("icon") as string;
        const url = formData.get("url") as string;

        if (!name || !description || !icon) {
            return { error: "All fields are required" };
        }

        const tool = addAITool({ name, description, icon, url });
        return { success: true, toolId: tool.id };
    };

    const [state, formAction, isPending] = useActionState(action, {});

    useEffect(() => {
        if (state.success && state.toolId) {
            navigate(`/${state.toolId}`);
        }
    }, [state.success, state.toolId, navigate]);

    return (
        <div className="max-w-md mx-auto my-8 p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
            <h2 className="mb-6 text-white text-2xl font-semibold">Add new AI Tool</h2>

            <form ref={formRef} action={formAction} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-slate-400 text-sm">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="e.g. ChatGPT"
                        className="p-3 rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                </div>

                <div className="flex flex-col gap-2 relative group">
                    <div className="flex justify-between items-center">
                        <label htmlFor="description" className="text-slate-400 text-sm">Description</label>
                        <button
                            type="button"
                            onClick={handleGenerateAI}
                            className="text-indigo-400 hover:text-indigo-300 transition-colors p-1 rounded-lg hover:bg-white/5 flex items-center gap-1 text-sm border-none cursor-pointer"
                            title="Generate AI Description"
                        >
                            <span>✨</span>
                            <span className="text-xs">Generate</span>
                        </button>
                    </div>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="What does this tool do?"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-3 rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-vertical"
                    />
                    {aiPromise && (
                        <div className="mt-2">
                            <Suspense fallback={<p className="text-xs text-indigo-400 animate-pulse">Generating description... ✨</p>}>
                                <AIDescriptionPreview promise={aiPromise} onAccept={(val) => {
                                    setDescription(val);
                                    setAiPromise(null);
                                }} />
                            </Suspense>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="icon" className="text-slate-400 text-sm">Icon URL</label>
                    <input
                        id="icon"
                        name="icon"
                        type="text"
                        placeholder="https://example.com/icon.png"
                        className="p-3 rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="url" className="text-slate-400 text-sm">URL</label>
                    <input
                        id="url"
                        name="url"
                        type="text"
                        placeholder="https://example.com"
                        className="p-3 rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                </div>

                {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
                {state.success && <p className="text-emerald-500 text-sm">Tool added successfully!</p>}

                <button
                    type="submit"
                    disabled={isPending}
                    className={`mt-2 p-3 rounded-lg border-none font-semibold text-white transition-all transform active:scale-95 ${isPending
                        ? 'bg-slate-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] cursor-pointer'
                        }`}
                >
                    {isPending ? 'Adding...' : 'Add AI Tool'}
                </button>
            </form>
        </div>
    );
};

const AIDescriptionPreview = ({ promise, onAccept }: { promise: Promise<string>, onAccept: (val: string) => void }) => {
    const result = use(promise);
    return (
        <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-sm animate-in fade-in slide-in-from-top-1">
            <p className="text-slate-300 mb-2 italic">"{result}"</p>
            <button
                type="button"
                onClick={() => onAccept(result)}
                className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded transition-colors border-none cursor-pointer"
            >
                Accept ✨
            </button>
        </div>
    );
};

import { use } from "react";

interface IProps {
    promise: Promise<{ response: string }>;
    onAccept: (val: string) => void;
}

export const AIDescriptionPreview = ({ promise, onAccept }: IProps): React.ReactNode => {
    const result = use(promise);
    return (
        <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-sm animate-in fade-in slide-in-from-top-1">
            <p className="text-slate-300 mb-2 italic">"{result.response}"</p>
            <button
                type="button"
                onClick={() => onAccept(result.response)}
                className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded transition-colors border-none cursor-pointer"
            >
                Accept ✨
            </button>
        </div>
    );
};

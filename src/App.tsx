import { Link } from "react-router";
import { useStore } from "./store";

function App() {
  const { aiTools } = useStore()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
            AI Tool Explorer
          </h1>
          <p className="text-slate-400 text-lg">Manage your favorite AI tools in one place</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          <section>
            <h2 className="text-2xl font-bold mb-6 text-slate-100">Your AI Library</h2>
            {aiTools.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-800 text-slate-500 bg-slate-900/30">
                No tools added yet. Use the form to get started.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {aiTools.map((tool) => (
                  <Link
                    to={`/${tool.id}`}
                    key={tool.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex gap-4 items-center transition-all hover:bg-white/10 hover:translate-x-1"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-white/5 shadow-inner">
                      <img
                        src={tool.icon}
                        alt={tool.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/48?text=AI';
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
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default App


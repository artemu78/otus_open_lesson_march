import { ToolsList } from "@/components/toolsList";
import { useGetTools } from "@/hooks/getTools";

function App() {
  useGetTools();

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
            <ToolsList />
          </section>
        </div>
      </div>
    </div>
  )
}

export default App


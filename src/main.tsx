import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import { useParams } from "react-router";
import App from './App.tsx'
import { Nav } from './components/nav/index.tsx'
import { AddAIToolForm } from './components/add/index.tsx'
import { Tool } from './components/tool/index.tsx'

const ToolWrapper = () => {
  const { id } = useParams();
  return <Tool id={id || ""} />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<AddAIToolForm />} />
        <Route path="/:id" element={<ToolWrapper />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

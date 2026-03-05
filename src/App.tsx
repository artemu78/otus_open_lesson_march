import { useStore } from "./store";

function App() {
  const { count, inc } = useStore()
  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={inc}>Increment</button>
    </>
  )
}

export default App

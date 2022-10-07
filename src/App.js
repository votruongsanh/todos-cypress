import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoApp from "./components/TodoApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoApp />} />
        {/* <Route path="/all" element={<TodoApp />} />
        <Route path="/active" element={<TodoApp />} />
        <Route path="/complete" element={<TodoApp />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

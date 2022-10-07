import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoApp from "./components/TodoApp";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<TodoApp />} />
    //   </Routes>
    // </BrowserRouter>
    <TodoApp />
  );
}

export default App;

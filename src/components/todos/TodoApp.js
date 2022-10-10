import { useEffect, useState } from "react";
import apis from "../../lib/apis";
import { filterTodos } from "../../lib/utils";
import TodoFooter from "./TodoFooter";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoApp = () => {
  const [currentTodo, setCurrentTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoStatus, setTodosStatus] = useState("");
  const [error, setError] = useState(false);
  const remaining = todos.filter((t) => !t.isComplete).length;

  useEffect(() => {
    apis
      .loadTodos()
      .then(({ data }) => setTodos(data))
      .catch(() => setError(true));
  }, []);

  const handleNewTodoChange = (event) => {
    setCurrentTodo(event.target.value);
  };

  const handleTodoSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      id: Date.now(),
      name: currentTodo,
      isComplete: false,
    };
    setTimeout(() => {
      apis
        .saveTodo(newTodo)
        .then(({ data }) => {
          setTodos(todos.concat(data));
          setCurrentTodo("");
        })
        .catch(() => setError(true));
    }, 4500);
  };

  const handleDelete = (id) => {
    apis.deleteTodo(id).then(() => {
      const todoDeleted = todos.filter((t) => t.id !== id);
      setTodos(todoDeleted);
    });
  };

  const handleChecked = (id) => {
    const targetTodo = todos.find((t) => t.id === id);
    const updatedTodo = {
      ...targetTodo,
      isComplete: !targetTodo.isComplete,
    };
    apis.updateTodo(updatedTodo).then(({ data }) => {
      const newTodos = todos.map((t) => (t.id === data.id ? data : t));
      setTodos(newTodos);
    });
  };

  const handleTodoStatus = (status) => {
    setTodosStatus(status);
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        {error ? <span className="error">Oh no!</span> : null}
        <TodoForm
          currentTodo={currentTodo}
          handleNewTodoChange={handleNewTodoChange}
          handleTodoSubmit={handleTodoSubmit}
        />
      </header>
      <section className="main">
        <TodoList
          todos={filterTodos(todoStatus, todos)}
          handleDelete={handleDelete}
          handleChecked={handleChecked}
        />
      </section>
      <TodoFooter remaining={remaining} handleTodoStatus={handleTodoStatus} />
    </>
  );
};

export default TodoApp;

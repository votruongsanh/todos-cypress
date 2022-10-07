import React from "react";

const TodoForm = ({ currentTodo, handleTodoSubmit, handleNewTodoChange }) => {
  return (
    <form onSubmit={handleTodoSubmit}>
      <input
        type="text"
        autoFocus
        value={currentTodo}
        onChange={handleNewTodoChange}
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};

export default TodoForm;

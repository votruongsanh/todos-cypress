import React from "react";

const TodoItem = ({ id, name, isComplete, handleDelete, handleChecked }) => {
  return (
    <li className={isComplete ? "completed" : null}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={isComplete}
          onChange={() => handleChecked(id)}
        />
        <label>{name}</label>
        <button className="destroy" onClick={() => handleDelete(id)}></button>
      </div>
    </li>
  );
};

const TodoList = ({ todos = [], handleDelete, handleChecked }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          handleDelete={handleDelete}
          handleChecked={handleChecked}
        />
      ))}
    </ul>
  );
};

export default TodoList;

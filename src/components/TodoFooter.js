import React from "react";

const todoStatus = [
  {
    status: "",
    name: "All",
  },
  {
    status: "active",
    name: "Active",
  },
  {
    status: "completed",
    name: "Completed",
  },
];

const TodoFooter = ({ remaining, handleTodoStatus }) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{remaining}</strong>
        {remaining === 1 ? " todo" : " todos"} left
      </span>
      <ul className="filters">
        {todoStatus.map(({ status, name }, index) => (
          <li
            key={index}
            style={{ margin: "0 16px", cursor: "pointer" }}
            onClick={() => {
              handleTodoStatus(status);
            }}
          >
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default TodoFooter;

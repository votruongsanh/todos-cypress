import React from "react";
import { Link } from "react-router-dom";

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
            onClick={() => {
              handleTodoStatus(status);
            }}
          >
            <Link>{name}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default TodoFooter;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

const apis = {
  loadTodos: () => api.get("todos"),
  saveTodo: (todo) => api.post("todos", todo),
  deleteTodo: (id) => api.delete(`todos/${id}`),
  updateTodo: (todo) => api.put(`todos/${todo.id}`, todo),
};
export default apis;

import { ApiClient } from ".";

export default class TodoService {
  static async getAllTodos() {
    return await ApiClient.get("todos/");
  }

  static async createTodo(contents) {
    return await ApiClient.post("todos/create/", { contents });
  }

  static async deleteTodo(id) {
    return await ApiClient.post("todos/delete/", { id });
  }

  static async getTodoById(id) {
    return await ApiClient.get(`todos/${id}/`);
  }
}

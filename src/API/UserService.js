import { ApiClient } from ".";

export default class UserService {
  static async register(username, email, password) {
    return await ApiClient.post("account/register/", {
      username,
      email,
      password,
    });
  }

  static async login(username, password) {
    return await ApiClient.post("account/login/", { username, password });
  }

  static async logout() {
    return await ApiClient.post("account/logout/");
  }

  static async info() {
    return await ApiClient.get("account/info/");
  }

  static async updateInfo(id, username, email, password) {
    if (password) {
      return await ApiClient.put("account/update/", {
        id,
        username,
        email,
        password,
      });
    } else {
      return await ApiClient.put("account/update/", {
        id,
        username,
        email,
      });
    }
  }
}

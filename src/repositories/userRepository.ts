const fs = require("fs-extra")
const path = require("path")

const DB_PATH = path.join(__dirname, "../database/db.json");

interface User {
  id: string | null,
  name: string,
  email: string
}

class UserRepository {
  async getAllUsers() {
    const data = await fs.readJson(DB_PATH)
    return data.users;
  }

  async getById(id) {
    const data = await fs.readJson(DB_PATH);
    return data.users.find(user => user.id === id);
  }

  async deleteUser(id) {
    const data = await fs.readJson(DB_PATH);
    const updatedUsers = data.users.filter(user => user.id !== id);

    if (updatedUsers.length === data.users.length) {
      return false;
    };

    return fs.writeJson(DB_PATH, { users: updatedUsers })
  }

  async addUser(user: User) {
    const data = await fs.readJson(DB_PATH);
    user.id = data.users.length ? data.users[data.users.length - 1].id + 1 : 1;
    data.users.push(user);
    await fs.writeJson(DB_PATH, data)
    return user;
  }
}
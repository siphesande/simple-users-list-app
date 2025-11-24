const UserRepository = require("./UserRepository");

class InMemoryUserRepo extends UserRepository {
  constructor() {
    super();
    this.users = [];
    this.nextId = 1;
  }

  async createUser(user) {
    const newUser = { id: this.nextId++, ...user };
    this.users.push(newUser);
    return newUser;
  }

  async deleteUser(id) {
    this.users = this.users.filter(u => u.id !== Number(id));
    return true;
  }

  async listUsers() {
    return this.users;
  }
}

module.exports = InMemoryUserRepo;

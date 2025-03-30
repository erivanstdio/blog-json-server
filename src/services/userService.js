class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async getUserById(id) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  }

  async addUser(userData) {
    if (!userData.name || !userData.email) {
      throw new Error("Nome e e-mail são obrigatórios");
    }
    return await this.userRepository.addUser(userData);
  }
}

module.exports = UserService;

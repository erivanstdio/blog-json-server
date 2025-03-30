class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getAllUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getUserById = async (req, res) => {
    try {
      const user = await this.userService.getUserById(parseInt(req.params.id));
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  addUser = async (req, res) => {
    try {
      const newUser = await this.userService.addUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = UserController;

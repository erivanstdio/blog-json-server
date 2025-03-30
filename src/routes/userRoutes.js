const express = require("express");
const UserController = require("../controllers/userController");
const UserService = require("../services/userService");
const UserRepository = require("../repositories/userRepository.ts");

const router = express.Router();
const userService = new UserService(UserRepository);
const userController = new UserController(userService);

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.addUser);

module.exports = router;

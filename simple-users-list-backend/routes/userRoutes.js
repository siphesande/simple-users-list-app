const express = require("express");
const router = express.Router();

module.exports = (userRepository) => {
  router.post("/", async (req, res) => {
    const newUser = await userRepository.createUser(req.body);
    res.status(201).json(newUser);
  });

  router.delete("/:id", async (req, res) => {
    await userRepository.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  });

  router.get("/", async (req, res) => {
    const users = await userRepository.listUsers();
    res.json(users);
  });

  return router;
};

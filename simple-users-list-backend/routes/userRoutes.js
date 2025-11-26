const express = require("express");

module.exports = function (userRepository) {
  const router = express.Router();

  // GET all users
  router.get("/", async (req, res) => {
    try {
      const users = await userRepository.getAll();
      res.json(users);
    } catch (err) {
      console.error("Error fetching users:", err.message);
      res.status(500).json({ error: "Failed to retrieve users." });
    }
  });

  // Add user
  router.post("/", async (req, res) => {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: "Email address already registered." });
      }
      const user = await userRepository.add({ name, email });
      res.status(201).json(user);
    } catch (err) {
      console.error("Error creating user:", err.message);
      res.status(500).json({ error: "Failed to create user due to a server error." });
    }
  });

  // Delete user
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const deleted = await userRepository.delete(id);

      if (deleted) {
        res.status(200).json({ success: true, message: `User with ID ${id} deleted.` });
      } else {
        res.status(404).json({ success: false, message: `User with ID ${id} not found.` });
      }
    } catch (err) {
      console.error("Error deleting user:", err.message);
      res.status(500).json({ error: "Failed to delete user." });
    }
  });

  return router;
};
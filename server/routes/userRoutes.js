const express = require("express");
const router = express.Router();
const User = require("../schemas/userSchema");

// fetch all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

// total users
router.get("/total/users", async (req, res) => {
  try {
    const users = await User.countDocuments();
    res.status(200).json({ totalUsers: users });
  } catch (error) {
    console.log("Error fetching Users");
    res.status(500).json({ error: "Error fetching the users" });
  }
});

// delete user by Mongo _id
router.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting user" });
  }
});

module.exports = router;

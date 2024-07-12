const router = require("express").Router();
const { User } = require("../../models");

// Get all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedUser[0]) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedUser) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

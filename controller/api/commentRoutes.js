const router = require("express").Router();
const { Comment } = require("../../models");

// Get all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single comment by ID
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new comment
router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a comment by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedComment[0]) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a comment by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedComment) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

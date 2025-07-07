// src/routes/bookRoutes.js
const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET /books - Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /books - Add a new book
router.post("/", async (req, res) => {
  const { title, author, year } = req.body;

  const book = new Book({
    title,
    author,
    year,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /books/:id - Delete a book by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require("express");
let books = require("./booksdb.js");
const public_users = express.Router();

// -------------------- Task 1 / Task 10 --------------------
// Get all books (Async/Await)
public_users.get("/", async (req, res) => {
    try {
        // Simulate async operation with Promise
        const allBooks = await new Promise((resolve, reject) => {
            resolve(books);
        });
        res.send(JSON.stringify(allBooks, null, 4));
    } catch (err) {
        res.status(500).json({ message: "Error retrieving books" });
    }
});

// -------------------- Task 2 / Task 11 --------------------
// Get book details based on ISBN (Promise)
public_users.get("/isbn/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    new Promise((resolve, reject) => {
        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject("Book not found");
        }
    })
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ message: err }));
});

// -------------------- Task 3 / Task 12 --------------------
// Get books by Author (Async/Await)
public_users.get("/author/:author", async (req, res) => {
    const author = req.params.author;
    try {
        const booksByAuthor = await new Promise((resolve, reject) => {
            const result = [];
            Object.keys(books).forEach(key => {
                if (books[key].author.toLowerCase() === author.toLowerCase()) {
                    result.push(books[key]);
                }
            });
            resolve(result);
        });

        if (booksByAuthor.length === 0) {
            res.status(404).json({ message: "No books found for this author" });
        } else {
            res.json(booksByAuthor);
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving books by author" });
    }
});

// -------------------- Task 4 / Task 13 --------------------
// Get books by Title (Promise)
public_users.get("/title/:title", (req, res) => {
    const title = req.params.title;
    new Promise((resolve, reject) => {
        const result = [];
        Object.keys(books).forEach(key => {
            if (books[key].title.toLowerCase() === title.toLowerCase()) {
                result.push(books[key]);
            }
        });
        resolve(result);
    })
    .then(booksByTitle => {
        if (booksByTitle.length === 0) {
            res.status(404).json({ message: "No books found for this title" });
        } else {
            res.json(booksByTitle);
        }
    })
    .catch(err => res.status(500).json({ message: "Error retrieving books by title" }));
});

// -------------------- Task 5 --------------------
// Get book reviews by ISBN
public_users.get("/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.json(books[isbn].reviews);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// -------------------- Task 6 --------------------
// Register a new user
let users = []; // Registered users array

public_users.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    if (users.some(u => u.username === username)) {
        return res.status(400).json({ message: "Username already exists" });
    }
    users.push({ username, password });
    res.json({ message: "User successfully registered. Now you can login" });
});

module.exports.general = public_users;
module.exports.users = users;

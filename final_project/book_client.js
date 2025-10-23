const axios = require("axios");

const BASE_URL = "https://sharvaansing-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai";

// Task 10: Get all books (async/await)
async function getAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        console.log("Task 10: All Books");
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
    }
}

// Task 11: Get book by ISBN (Promise)
function getBookByISBN(isbn) {
    axios.get(`${BASE_URL}/isbn/${isbn}`)
        .then(response => {
            console.log(`Task 11: Book details for ISBN ${isbn}`);
            console.log(response.data);
        })
        .catch(error => {
            console.error(error.message);
        });
}

// Task 12: Get books by Author (async/await)
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
        console.log(`Task 12: Books by Author "${author}"`);
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
    }
}

// Task 13: Get books by Title (Promise)
function getBooksByTitle(title) {
    axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`)
        .then(response => {
            console.log(`Task 13: Books with Title "${title}"`);
            console.log(response.data);
        })
        .catch(error => {
            console.error(error.message);
        });
}

// Execute all tasks sequentially
async function runTasks() {
    await getAllBooks();                  // Task 10
    getBookByISBN(1);                     // Task 11
    await getBooksByAuthor("Jane Austen"); // Task 12
    getBooksByTitle("Fairy tales");       // Task 13
}

runTasks();

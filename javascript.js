const container = document.querySelector(".container")

// Gather all book objects
const myLibrary = [];


function Book(title, author) {
    this.title = title;
    this.author = author;
}

// Put them in the DOM
Book.prototype.displayBook = function() {
    const title = document.createElement("p");
    const author = document.createElement("p");
    container.appendChild(title);
    container.appendChild(author);
    title.textContent = this.title;
    author.textContent = this.author;
}

// Create book objects and add them to the array
function addBookToLibrary(title, author) {
    myLibrary.push({title: title, author: author})
    displayBooks();
}

// Select the last book object from the array and create a new book object with the book constructor
function displayBooks() {
    lastBook = myLibrary[myLibrary.length - 1];
    const libro = new Book(lastBook.title, lastBook.author)
    libro.displayBook();
}

// Take the form data to create a new book object
const bookForm = document.querySelector(".book-form")
const titleInput = document.querySelector(".title-input")
const authorInput = document.querySelector(".author-input")
bookForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    addBookToLibrary(titleInput.value, authorInput.value)
    console.log(myLibrary)
})
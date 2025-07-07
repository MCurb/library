const container = document.querySelector(".container")

const myLibrary = [
    {title: "Alter Ego", author: "Todd Herman"},
    {title: "Can't hurt me", author: "David Goggins"}
]

function Book(title, author) {
    this.title = title;
    this.author = author;
}

Book.prototype.displayBook = function() {
    const title = document.createElement("p");
    const author = document.createElement("p");
    container.appendChild(title);
    container.appendChild(author);
    title.textContent = this.title;
    author.textContent = this.author;
}

for (const book of myLibrary) {
    const libro = new Book(book.title, book.author)
    libro.displayBook();
}

// function addBookToLibrary() {

// }

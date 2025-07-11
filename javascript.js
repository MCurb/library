const container = document.querySelector(".main-content");

// Gather all book objects
const myLibrary = [];

function Book(title, author, pages, importance, note, status, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.importance = importance;
  this.note = note;
  this.status = status;
  this.id = id;
}

const tableBody = document.querySelector(".table-body");

// Put them in the DOM
Book.prototype.displayBook = function () {
  const newRow = document.createElement("tr");
  newRow.setAttribute("data-book-id", `${this.id}`);
  tableBody.appendChild(newRow);
  const title = document.createElement("td");
  const author = document.createElement("td");
  const pages = document.createElement("td");
  const importance = document.createElement("td");
  const note = document.createElement("td");

  const statusCell = document.createElement("td");
  const statusBtn = document.createElement("button");
  statusBtn.setAttribute("data-book-id", `${this.id}`);

  statusBtn.addEventListener("click", () => {
    if (statusBtn.textContent === "READ") {
      statusBtn.textContent = "NOT READ";
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === statusBtn.dataset.bookId) {
          myLibrary[i].status = "Not read";
        }
      }
    } else {
      statusBtn.textContent = "READ";
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === statusBtn.dataset.bookId) {
          myLibrary[i].status = "Read";
        }
      }
    }
  });
  statusCell.appendChild(statusBtn);
  const deleteCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "DELETE";
  deleteBtn.setAttribute("data-book-id", `${this.id}`);
  deleteCell.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    if (newRow.dataset.bookId === deleteBtn.dataset.bookId) {
      newRow.remove();
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === deleteBtn.dataset.bookId) {
          myLibrary.splice(i, 1);
        }
      }
    }
  });

  newRow.appendChild(title);
  newRow.appendChild(author);
  newRow.appendChild(pages);
  newRow.appendChild(importance);
  newRow.appendChild(note);
  newRow.appendChild(statusCell);
  newRow.appendChild(deleteCell);
  title.textContent = this.title;
  author.textContent = this.author;
  pages.textContent = this.pages;
  importance.textContent = this.importance;
  note.textContent = this.note;
  statusBtn.textContent = this.status;
};

// Create book objects and add them to the array
function addBookToLibrary(title, author, pages, importance, note, status, id) {
  myLibrary.push({
    title: title,
    author: author,
    pages: pages,
    importance: importance,
    note: note,
    status: status,
    id: id,
  });
  displayBooks();
}

// Select the last book object from the array and create a new book object with the book constructor
function displayBooks() {
  lastBook = myLibrary[myLibrary.length - 1];
  const libro = new Book(
    lastBook.title,
    lastBook.author,
    lastBook.pages,
    lastBook.importance,
    lastBook.note,
    lastBook.status,
    lastBook.id
  );
  libro.displayBook();
}

// Take the form data to create a new book object
const bookForm = document.querySelector(".book-form");
const titleInput = document.querySelector(".title-input");
const authorInput = document.querySelector(".author-input");
const rangeInput = document.querySelector(".range-input");
const selectInput = document.querySelector(".select-input");
const textareaInput = document.querySelector(".textarea-input");
const selectStatusInput = document.querySelector(".select-status");
bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    rangeInput.value,
    selectInput.value,
    textareaInput.value,
    selectStatusInput.value,
    self.crypto.randomUUID()
  );
  console.log(myLibrary);
});

const pageNumber = document.querySelector(".page-number");
pageNumber.textContent = rangeInput.value;

rangeInput.addEventListener("input", (event) => {
  pageNumber.textContent = event.target.value;
});

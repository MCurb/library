/* ================================
   1. DATA
================================ */
const myLibrary = [];

/* ================================
2. DOM SELECTORS
================================ */

// Form
const bookForm = document.querySelector(".book-form");

const titleInput = document.querySelector(".title-input");
const authorInput = document.querySelector(".author-input");
const rangeInput = document.querySelector(".range-input");
const selectInput = document.querySelector(".select-input");
const textareaInput = document.querySelector(".textarea-input");
const selectStatusInput = document.querySelector(".select-status");

const pageNumber = document.querySelector(".page-number");

// Table
const bookTable = document.querySelector(".book-table");
const tableBody = document.querySelector(".table-body");

const examplelementeRow1 = document.querySelector(".example-row1");
const examplelementeRow2 = document.querySelector(".example-row2");
const examplelementeRow3 = document.querySelector(".example-row3");

/* ================================
3. PURE LOGIC FUNCTIONS
================================ */

// Create book objects and push them into the array
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
  createNewBook();
}

// Book Object Constructor
function Book(title, author, pages, importance, note, status, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.importance = importance;
  this.note = note;
  this.status = status;
  this.id = id;
}

/* ================================
4. DOM UPDATE FUNCTIONS
================================ */

// Select the last book in the array and create a new object with it
function createNewBook() {
  lastBook = myLibrary[myLibrary.length - 1];
  const bookInfo = new Book(
    lastBook.title,
    lastBook.author,
    lastBook.pages,
    lastBook.importance,
    lastBook.note,
    lastBook.status,
    lastBook.id
  );
  bookInfo.displayBook();
}

// Displays the book in the table and attaches its button logic.
Book.prototype.displayBook = function () {
  // Create row cells
  const title = document.createElement("td");
  const author = document.createElement("td");
  const pages = document.createElement("td");
  const importance = document.createElement("td");
  const note = document.createElement("td");

  //STATUS BUTTON:
  // Create status cell and append status btn
  const statusCell = document.createElement("td");
  const statusBtn = document.createElement("button");
  statusBtn.setAttribute("data-book-id", `${this.id}`);
  statusBtn.classList.add("status-btn");
  statusCell.appendChild(statusBtn);

  // Read status btn logic: Toggle the read status and update the book object in the array
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

  //DELETE BUTTON:
  // Create delete cell and append delete btn
  const deleteCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "DELETE";
  deleteBtn.setAttribute("data-book-id", `${this.id}`);
  deleteBtn.classList.add("delete-btn");
  deleteCell.appendChild(deleteBtn);

  // Delete Btn logic: Remove the book row, and its book object in the array
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

  // Create a new table row
  const newRow = document.createElement("tr");
  newRow.setAttribute("data-book-id", `${this.id}`);

  // Append elements to row / Append row to table
  newRow.append(title, author, pages, importance, note, statusCell, deleteCell);
  tableBody.appendChild(newRow);

  // Put the book object info into the created elements
  title.textContent = this.title;
  author.textContent = this.author;
  pages.textContent = this.pages;
  importance.textContent = this.importance;
  note.textContent = this.note;
  statusBtn.textContent = this.status;
};

/* ================================
   5. EVENT HANDLERS
================================ */

// Pass form data to a function and prevent uploading it to the server
function handleFormData(event) {
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
}

// Add logic to the buttons of the three books example
function handleExampleDOM(event) {
  // Read status example logic
  if (event.target.matches(".read-status-example1")) {
    toggleReadStatus(event.target);
  } else if (event.target.matches(".read-status-example2")) {
    toggleReadStatus(event.target);
  } else if (event.target.matches(".read-status-example3")) {
    toggleReadStatus(event.target);
  }
  // Delete btn example logic
  else if (event.target.matches(".delete-btn-example1")) {
    examplelementeRow1.remove();
  } else if (event.target.matches(".delete-btn-example2")) {
    examplelementeRow2.remove();
  } else if (event.target.matches(".delete-btn-example3")) {
    examplelementeRow3.remove();
  }
}

function toggleReadStatus(button) {
  button.textContent = button.textContent === "READ" ? "NOT READ" : "READ";
}

// Display range input value in the output element
function handleRangeInput(event) {
  pageNumber.textContent = event.target.value;
}

/* ================================
   6. EVENT LISTENERS
================================ */
bookForm.addEventListener("submit", handleFormData);

bookTable.addEventListener("click", handleExampleDOM);

rangeInput.addEventListener("input", handleRangeInput);

/* ===================================
   7. INITIALIZATION
=================================== */
pageNumber.textContent = rangeInput.value;

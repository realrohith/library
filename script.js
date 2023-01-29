const btnAddBook = document.querySelector("#addbook");
const main = document.querySelector("main");
const moda = document.querySelector(".modal");
const btnSubmit = document.querySelector(".submit");
const form = document.querySelector("#addBookForm");
const booksGrid = document.querySelector("#books-grid");

btnAddBook.onclick = () => {
  main.classList.add("out-of-focus");
  moda.classList.add("active");
  document.querySelector(".title").focus();
};
window.onclick = (e) => {
  if (e.target != btnAddBook && !moda.contains(e.target)) {
    main.classList.remove("out-of-focus");
    moda.classList.remove("active");
  }
};

form.onsubmit = (e) => {
  const title = document.querySelector(".title").value;
  const author = document.querySelector(".author").value;
  const pages = document.querySelector(".pages").value;
  const haveRead =
    document.querySelector("#haveRead").checked == true ? "Read" : "Not Read";
  main.classList.remove("out-of-focus");
  moda.classList.remove("active");
  addBookToLibrary(title, author, pages, haveRead);
  form.reset();
  e.preventDefault();
};

let myLibrary = [];
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}
function displayBookInGrid(book) {
  const div = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const read = document.createElement("button");
  const remove = document.createElement("button");

  remove.onclick = () => {
    let cnt = 0;
    myLibrary.forEach((book) => {
      if (book.title == title.textContent) {
        return;
      }
      cnt += 1;
    });
    myLibrary.splice(cnt, 1);
    div.remove();
  };

  read.onclick = () => {
    if (read.textContent == "Read") {
      read.textContent = "Not Read";
      read.classList.remove("read");
      read.classList.add("not-read");
    } else {
      read.textContent = "Read";
      read.classList.remove("not-read");
      read.classList.add("read");
    }
    myLibrary.forEach((book) => {
      if (book.title == title.textContent) {
        book.read = read.textContent;
      }
    });
  };

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  read.textContent = book.read;
  remove.textContent = "Remove";

  read.classList.add(read.textContent == "Read" ? "read" : "not-read");

  div.appendChild(title);
  div.appendChild(author);
  div.appendChild(pages);
  div.appendChild(read);
  div.appendChild(remove);
  div.classList.add("my-modal");
  booksGrid.appendChild(div);
}
function displayBooks() {
  booksGrid.innerHTML = "";
  myLibrary.forEach((book) => {
    displayBookInGrid(book);
  });
}

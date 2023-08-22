const myLibrary = [
  {
    title: "The Apinist",
    author: "JC Boro",
    pages: 200,
    isRead: false,
  },
  {
    title: "The Apinist2",
    author: "JC Boro2",
    pages: 202,
    isRead: true,
  },
  {
    title: "The Apinist3",
    author: "JC Boro3",
    pages: 203,
    isRead: true,
  },
]

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.info = function () {
  let read = "";
  this.isRead? read = "already readed": read = "not read yet";
  return this.title+" by "+this.author+", "+this.pages+" pages, "+read;
}

function addBookToLibrary(book) {
  // myLibrary.push(book);
  console.log(book);
  let bookCard = document.createDocumentFragment('div');
  bookCard.className = "book-card";
  Object.values(book).forEach((element) => {
    let p = document.createElement('p');
    p.textContent = element;
    bookCard.appendChild(p);
    console.log(p);
  });

  document.body.appendChild(bookCard);
}

addBookToLibrary(myLibrary[1]);

// const book1 = new Book('The Hobbit','J.R.R Tolkien','295',true);
// addBookToLibrary(book1);
// console.log(myLibrary[2]);

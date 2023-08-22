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

function removeBook() {
 this.parentElement.remove();
}

function updateDisplay(book) {
  // myLibrary.push(book);
  // console.log(book);
  let bookCardFragment = document.createDocumentFragment();
  let bookCard = document.createElement('div');
  let btnRemove = document.createElement('button');
  bookCard.className = "book-card";
  Object.keys(book).forEach((key) => {
    let p = document.createElement('p');
    p.textContent = key+": "+book[key];
    bookCardFragment.appendChild(p);
  });
  btnRemove.className = "btn-remove";
  btnRemove.innerHTML = "Remove";
  btnRemove.addEventListener('click', removeBook);
  bookCard.appendChild(bookCardFragment);
  bookCard.appendChild(btnRemove);
  document.body.appendChild(bookCard);
}

function addBookToLibrary(book) {
  
}

updateDisplay(myLibrary[1]);

// const book1 = new Book('The Hobbit','J.R.R Tolkien','295',true);
// addBookToLibrary(book1);
// console.log(myLibrary[2]);

const myLibrary = [
  {
    title: "The Alpinist",
    author: "JC Boro",
    pages: 200,
    isRead: false,
  },
  {
    title: "The Alpinist2",
    author: "JC Boro2",
    pages: 202,
    isRead: true,
  },
  {
    title: "The Alpinist3",
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

// Book.prototype.info = function () {
//   let read = "";
//   this.isRead? read = "already readed": read = "not read yet";
//   return this.title+" by "+this.author+", "+this.pages+" pages, "+read;
// }

function removeBook() {

 this.parentElement.remove();
 console.log(myLibrary[this.bookIndex]);
 myLibrary.splice(this.bookindex,1);
 console.log("Total in library: "+myLibrary.length);
}

function updateDisplay(book, bookIndex) {
  const bookContainer = document.getElementById('books-container')
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
  btnRemove.bookIndex = bookIndex;
  btnRemove.addEventListener('click', removeBook);
  bookCard.appendChild(bookCardFragment);
  bookCard.appendChild(btnRemove);
  bookContainer.appendChild(bookCard);
}

function addBookToLibrary() {
  const newBook = new Book('The Hobbit','J.R.R Tolkien','295', true);
  const bookIndex = (myLibrary.push(newBook) - 1);

  updateDisplay(newBook, bookIndex);
  console.log("Total in library: "+myLibrary.length);
}

const btnNew = document.getElementById('btn-newBook');
btnNew.addEventListener('click', addBookToLibrary);



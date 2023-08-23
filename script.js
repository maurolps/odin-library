const myLibrary = []

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.toggle = function () {
  this.status? this.status = false: this.status = true;
}

function toggleStatus(book, bookCard) {
  book.toggle();
  const status = bookCard.children[3];
  book.status? status.textContent = "Status: read": status.textContent = "Status: unread";
}

function removeBook() {
 this.parentElement.parentElement.parentElement.remove();
 myLibrary.splice(this.bookindex,1);
}

function updateDisplay(book, bookIndex) {
  const bookContainer = document.getElementById('books-container')
  const bookCardFragment = document.createDocumentFragment();
  const bookCol = document.createElement('div');
  const bookCard = document.createElement('div');
  const bookCardBody = document.createElement('div');
  const btnRemove = document.createElement('button');
  const btnToggle = document.createElement('button');

  bookCol.className = "col";
  bookCard.className = "card";
  bookCardBody.className = "card-body";
  Object.keys(book).forEach((key) => {
    let p = document.createElement('p');
    p.textContent = key+": "+book[key];
    (key==="title")? p.innerHTML = ('<p class="card-header"><b>'+book[key]+'</p>'):{};
    if (key==="status") {
      (book[key]===true)? p.textContent = "Status: read":
                          p.textContent = "Status: unread";
    }

    bookCardFragment.appendChild(p);
  });

  btnRemove.className = "btn-remove";
  btnRemove.innerHTML = "Remove";
  btnRemove.bookIndex = bookIndex;
  btnRemove.addEventListener('click', removeBook);

  btnToggle.className = "btn-toggle";
  btnToggle.innerHTML = "Toggle status";
  btnToggle.bookIndex = bookIndex;
  btnToggle.addEventListener('click', () => {
    toggleStatus(book,bookCardBody);
  });

  bookCol.appendChild(bookCard);
  bookCard.appendChild(bookCardBody);
  bookCardBody.appendChild(bookCardFragment);
  bookCardBody.appendChild(btnRemove);
  bookCardBody.appendChild(btnToggle);
  bookContainer.appendChild(bookCol);
}

function addBookModal(){
  addBookToLibrary("New book", "new author", 1, false);
}

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  const bookIndex = (myLibrary.push(newBook) - 1);

  updateDisplay(newBook, bookIndex);
  console.log("Total in library: "+myLibrary.length);
}

const btnNew = document.getElementById('btn-newBook');
btnNew.addEventListener('click', addBookModal);

addBookToLibrary("The Alpinist","J.C. Boro",520,true);
addBookToLibrary("More than a Glich","M. Broussard",248,true);
addBookToLibrary("Calculus for Dummies","M. Ryan",384,false);


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
  const bookCardFooter = document.createElement('div');
  const bookCardHeader = document.createElement('div');
  const btnRemove = document.createElement('button');
  const btnToggle = document.createElement('button');

  bookCol.className = "col";
  bookCard.className = "card h-100 border-light shadow bg-body-tertiary rounded";
  bookCardBody.className = "card-body text-secondary px-4 ";
  bookCardFooter.className = "card-footer1";
  bookCardHeader.className = "card-header text-center text-uppercase position-relative";

  btnRemove.className = "btn-close position-absolute top-0 end-0";
  btnRemove.setAttribute("aria-label", "Close");
  btnRemove.innerHTML = "";
  btnRemove.bookIndex = bookIndex;
  btnRemove.addEventListener('click', removeBook);

  btnToggle.className = "btn btn-primary btn-sm";
  btnToggle.innerHTML = "Toggle status";
  btnToggle.bookIndex = bookIndex;
  btnToggle.addEventListener('click', () => {
    toggleStatus(book,bookCardBody);
  });

  Object.keys(book).forEach((key) => {
    let p = document.createElement('p');
    p.className = "card-text";
    p.textContent = key+": "+book[key];
    if (key==="title") {
      p.innerHTML = "<b>"+book[key]+"</b>";
      bookCardHeader.appendChild(p);
      bookCardHeader.appendChild(btnRemove);
      bookCard.appendChild(bookCardHeader);
      return;
    };
    if (key==="status") {
      (book[key]===true)? p.textContent = "Status: read":
                          p.textContent = "Status: unread";
    }
    
    bookCardFragment.appendChild(p);
  });

  bookCol.appendChild(bookCard);
  bookCard.appendChild(bookCardBody);
  bookCardBody.appendChild(bookCardFragment);
  // bookCardFooter.appendChild(btnRemove);
  bookCardFooter.appendChild(btnToggle);
  bookCard.appendChild(bookCardFooter);
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


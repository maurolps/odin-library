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

function toggleStatus(book, bookCard, btnToggle) {
  book.toggle();
  const status = bookCard.children[2];
  if(book.status) { 
    status.textContent = "status: Read";
    btnToggle.checked = true;
  }
  else { 
    status.textContent = "status: Unread"; 
    btnToggle.checked = false;
  }
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
  // const btnToggle = document.createElement('button');
  const btnToggleContainer = document.createElement('div');
  const btnToggleInput = document.createElement('input');
  const btnToggleLabel = document.createElement('label');

  bookCol.className = "col";
  bookCard.className = "card h-100 border-light shadow bg-body-tertiary rounded ";
  bookCardBody.className = "card-body text-secondary px-4 ";
  bookCardFooter.className = "card-footer bg-light";
  bookCardHeader.className = "card-header text-center  text-uppercase pt-4";

  btnRemove.className = "btn-close position-absolute top-0 end-0 border-danger";
  btnRemove.setAttribute("aria-label", "Close");
  btnRemove.innerHTML = "";
  btnRemove.bookIndex = bookIndex;
  btnRemove.addEventListener('click', removeBook);

  btnToggleContainer.className = "form-check form-switch form-check-reverse";
  btnToggleInput.className = "form-check-input"; 
  btnToggleInput.type = "checkbox";
  btnToggleInput.role = "switch";
  btnToggleInput.id = "switch";
  btnToggleInput.checked = true;
  btnToggleLabel.className = "form-check-label";
  btnToggleLabel.for = "switch";
  btnToggleLabel.textContent = "Read";
  btnToggleContainer.appendChild(btnToggleInput);
  btnToggleContainer.appendChild(btnToggleLabel);
  btnToggleInput.addEventListener('click', () => {
  toggleStatus(book, bookCardBody, btnToggleInput);
  });

  // btnToggle.className = "btn btn-outline-info rounded-pill btn-sm";
  // btnToggle.innerHTML = "Toggle Status";
  // btnToggle.bookIndex = bookIndex;
  // btnToggle.addEventListener('click', () => {
  //   toggleStatus(book, bookCardBody, btnToggle);
  // });

  Object.keys(book).forEach((key) => {
    let p = document.createElement('p');
    p.className = "card-text";
    p.innerHTML = key+": "+book[key];
    if (key==="title") {
      p.innerHTML = '<img class="icon position-absolute top-0 start-50 " src="assets/book.svg" alt="LIBRARY"> <b>'+book[key]+'</b>';
      bookCardHeader.appendChild(p);
      bookCardHeader.appendChild(btnRemove);
      bookCard.appendChild(bookCardHeader);
      return;
    };
    if (key==="status") {
      if(book[key]===true){ 
        p.innerHTML = "status: Read";
        // btnToggle.innerHTML = "Mark Unread";
        // btnToggle.className = "btn btn-outline-secondary rounded-pill btn-sm";
        btnToggleInput.checked = true;
      } else {
        p.innerHTML = "status: Unread";
        // btnToggle.innerHTML = "Mark read";
        // btnToggle.className = "btn btn-success rounded-pill btn-sm";
        btnToggleInput.checked = false;
      }
    }
    
    bookCardFragment.appendChild(p);
  });

  bookCol.appendChild(bookCard);
  bookCard.appendChild(bookCardBody);
  bookCardBody.appendChild(bookCardFragment);
  // bookCardFooter.appendChild(btnToggle);
  bookCardFooter.appendChild(btnToggleContainer);
  bookCard.appendChild(bookCardFooter);
  bookContainer.appendChild(bookCol);
}

function addBookModal(e){
  const bookTitle = document.getElementById("validation1");
  const bookAuthor = document.getElementById("validation2");
  const bookPages = document.getElementById("validation3");
  addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, false);
  e.preventDefault();
  document.getElementById("btn-closeModal").click();
}

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  const bookIndex = (myLibrary.push(newBook) - 1);

  updateDisplay(newBook, bookIndex);
  console.log("Total in library: "+myLibrary.length);
}

const formAddBook = document.getElementById('form-addBook');
formAddBook.addEventListener('submit', addBookModal);


addBookToLibrary("More than a Glich","M. Broussard",248,true);
addBookToLibrary("Calculus for Dummies","M. Ryan",384,false);
addBookToLibrary("Quantum Mechanics","L. Susskind",384,true);



function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    let read = "";
    isRead? read = "already readed": read = "not read yet";
    return title+" by "+author+", "+pages+" pages, "+read;
  }
}

const book1 = new Book('The Hobbit','J.R.R Tolkien','295',true);
console.log(book1.info());
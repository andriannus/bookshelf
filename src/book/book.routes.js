const {
  deleteBook,
  fetchBook,
  fetchBooks,
  storeBook,
  updateBook,
} = require("./book.controller");

const bookRoutes = [
  {
    method: "POST",
    path: "/books",
    handler: storeBook,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBook,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: fetchBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: fetchBook,
  },
];

module.exports = { bookRoutes };

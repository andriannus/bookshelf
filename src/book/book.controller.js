const { nanoid } = require("nanoid");

const { responseSuccess, responseError } = require("../shared/utils/response");

const books = [];

const fetchBook = (request, h) => {
  const selectedBook = books.find((book) => book.id === request.params.bookId);

  if (!selectedBook) {
    return responseError(h, {
      code: 404,
      message: "Buku tidak ditemukan",
    });
  }

  return responseSuccess(h, {
    code: 200,
    data: {
      book: selectedBook,
    },
  });
};

const fetchBooks = (request, h) => {
  const { finished, name, reading } = request.query;

  let newBooks = books;

  if (reading) {
    const hasReading = reading === "1";
    newBooks = books.filter((book) => book.reading === hasReading);
  }

  if (finished) {
    const hasFinished = finished === "1";
    newBooks = books.filter((book) => book.finished === hasFinished);
  }

  if (name) {
    newBooks = books.filter((book) => {
      return book.name.toUpperCase().includes(name.toUpperCase());
    });
  }

  const bookList = newBooks.map((book) => {
    return {
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    };
  });

  return responseSuccess(h, {
    code: 200,
    data: {
      books: bookList,
    },
  });
};

const storeBook = (request, h) => {
  if (!request.payload.name) {
    return responseError(h, {
      code: 400,
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
  }

  if (request.payload.readPage > request.payload.pageCount) {
    return responseError(h, {
      code: 400,
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
  }

  const id = nanoid(16);
  const finished = request.payload.readPage === request.payload.pageCount;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    ...request.payload,
    id,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  return responseSuccess(h, {
    code: 201,
    message: "Buku berhasil ditambahkan",
    data: {
      bookId: id,
    },
  });
};

const updateBook = (request, h) => {
  if (!request.payload.name) {
    return responseError(h, {
      code: 400,
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
  }

  if (request.payload.readPage > request.payload.pageCount) {
    return responseError(h, {
      code: 400,
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
  }

  const selectedBookIndex = books.findIndex(
    (book) => book.id === request.params.bookId,
  );

  if (selectedBookIndex < 0) {
    return responseError(h, {
      code: 404,
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
  }

  books[selectedBookIndex] = {
    ...books[selectedBookIndex],
    ...request.payload,
  };
  return responseSuccess(h, {
    code: 200,
    message: "Buku berhasil diperbarui",
  });
};

const deleteBook = (request, h) => {
  const selectedBookIndex = books.findIndex(
    (book) => book.id === request.params.bookId,
  );

  if (selectedBookIndex < 0) {
    return responseError(h, {
      code: 404,
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
  }

  books.splice(selectedBookIndex, 1);
  return responseSuccess(h, {
    code: 200,
    message: "Buku berhasil dihapus",
  });
};

module.exports = {
  fetchBook,
  fetchBooks,
  storeBook,
  updateBook,
  deleteBook,
};

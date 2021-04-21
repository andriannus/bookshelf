const { fetchAll } = require("./book.controller");

const bookRoutes = {
  method: "GET",
  path: "/book",
  handler: fetchAll,
};

module.exports = { bookRoutes };

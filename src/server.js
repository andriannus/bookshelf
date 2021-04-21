const Hapi = require("@hapi/hapi");

const { bookRoutes } = require("./book/book.routes");

const init = async () => {
  const server = Hapi.server({
    port: 9090,
    host: "localhost",
  });

  server.route([].concat(bookRoutes));

  await server.start();
  console.log("Server starting on port: 9090");
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();

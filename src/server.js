const Hapi = require("@hapi/hapi");

const { bookRoutes } = require("./book/book.routes");
const { config } = require("./shared/constants/config.constant");

const init = async () => {
  const server = Hapi.server({
    port: config.server.PORT,
    host: config.server.HOST,
  });

  server.route([...bookRoutes]);

  await server.start();
  console.log(`Server starting on port: ${config.server.PORT}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();

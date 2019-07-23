const app = require("../server");
const config = require("../_config");
const server = require("http").Server(app);

const port = config.PORT;

server.listen(port);

console.log("Server is on port "+ port);
const http = require("http");
const getUsers = require("./modules/users.js");
const { URL } = require("url"); 
const dotenv = require("dotenv");
dotenv.config();
const {PORT} = process.env;
console.log(PORT);

const server = http.createServer((request, response) => {
  const ipAddress = `http://127.0.0.1:${PORT}`;
  const url = new URL(request.url, ipAddress); 
  const userName = url.searchParams.get("hello");
  console.log(`Hello name is: ${userName}`);
  if (userName) {
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-Type", "text/plain");
      response.write(`Hello, ${userName}!!!`);
      response.end();
      return;
  }
  if (request.url === "/?hello") {
    response.statusCode = 400;
    response.statusMessage = "Bad Request";
    response.setHeader("Content-Type", "text/plain");
    response.write("Enter a name, pls");
    response.end();
    return;
  }
  if (request.url === "/?users") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "application/json");
    response.write(getUsers());
    response.end();
    return;
  } 
  if (request.url === "/") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "text/plain");
    response.write("Hello, World!!!");
    response.end();
    return;
  } 
    response.statusCode = 500;
    response.statusMessage = "Bad Request";
    response.setHeader("Content-Type", "text/plain");
    response.write("No hellos!!!");
    response.end();
    return;
});

server.listen(3003, () => {
  console.log(`Сервер запущен http://127.0.0.1:${PORT}`);
});

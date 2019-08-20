// All dependencies are added on a variable with require method(<dependece-name>)
const express = require("express");

// Create a new object from express
const server = express();

// User array sample
const users = ["Jonas", "Diego", "Marcela", "Andressa"];

/**
 * Set a router to http://server:listen_port/teste
 *
 * @param { Query } HTTP::__request
 * @param __response
 *
 * @return  json { query.name __response }
 */

server.get("/users", (__request, __response) => {
  const name = __request.query.name;
  return __response.json({ message: `Hello ${name}` });
});

// Start a server on port 9090
server.listen(9090);

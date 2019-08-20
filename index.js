// All dependencies are added on a variable with require method(<dependece-name>)
const express = require("express");

// Create a new object from express
const server = express();

// Users array sample
const users = ["Jonas", "Diego", "Marcela"];

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

/**
 * Set a router to http://server:listen_port/users/:index
 *
 * @param { Param } HTTP::__request
 * @param __response
 *
 * @return  json { user from a index param }
 */
server.get("/users/:index", (__request, __response) => {
  const { index } = __request.params;
  return __response.json(users[index]);
});

// Start a server on port 9090
server.listen(9090);

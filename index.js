// All dependencies are added on a variable with require method(<dependece-name>)
const express = require("express");

// Create a new object from express
const server = express();

/**
 * Set a router to http://server:listen_port/users
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
 * Set a router to http://server:listen_port/users/:id
 *
 * @param { Query } HTTP::__request
 * @param __response
 *
 * @return  json { param.id __response }
 */
server.get("/users/:id", (__request, __response) => {
  const { id } = __request.params;
  return __response.json({ message: `Looking for user id:  ${id}` });
});

// Start a server on port 9090
server.listen(9090);

// All dependencies are added on a variable with require method(<dependece-name>)
const express = require("express");

// Create a new object from express
const server = express();

// User array sample
const users = ["Jonas", "Diego", "Marcela", "Andressa"];

/**
 * Set a router to http://server:listen_port/users
 *
 * @param HTTP::__request
 * @param __response
 *
 * @return  json { return all users }
 */
server.get("/users", (__request, __response) => {
  return __response.json(users);
});

/**
 * Set a router to http://server:listen_port/user
 *
 * @param { Query } HTTP::__request
 * @param __response
 *
 * @return  json { query.name __response }
 */
server.get("/user", (__request, __response) => {
  const { id } = __request.query;
  return __response.json({ message: `Hello ${users[id]}` });
});

// Start a server on port 9090
server.listen(9090);

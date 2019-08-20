// All dependencies are added on a variable with require method(<dependece-name>)
const express = require("express");

// Create a new object from express
const server = express();

// Set server to allow HTTP::post json
server.use(express.json());

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

/**
 * Set a router to http://server:listen_port/user/add
 *
 * @param { body } HTTP::__request
 * @param __response
 *
 * @return  json { all users }
 */
server.post("/user/add", (__request, __response) => {
  const { name } = __request.body;
  users.push(name);
  return __response.json(users);
});

/**
 * Set a router to http://server:listen_port/user/edit/:id
 *
 * @param { body } HTTP::__request
 * @param __response
 *
 * @return  json { all users }
 */
server.put("/user/edit/:id", (__request, __response) => {
  const { id } = __request.params;
  const { name } = __request.body;
  users[id] = name;
  return __response.json(users);
});

/**
 * Set a router to http://server:listen_port/user/delete/:id
 *
 * @param { param } HTTP::__request
 * @param __response
 *
 * @return  json { all users }
 */
server.delete("/user/delete/:id", (__request, __response) => {
  const { id } = __request.params;
  users.splice(id, 1);
  return __response.json(users);
});

// Start a server on port 9090
server.listen(9090);

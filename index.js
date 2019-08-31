// All dependencies are added on a variable with require method(<dependece-name>)
const express = require("express");

// Create a new object from express
const server = express();

// Set server to allow HTTP::post json
server.use(express.json());

// Start a server on port 9090
server.listen(3333);

// User array sample
const users = ["Jonas", "Diego", "Marcela", "Andressa"];

/**
 * Middleware::Log control purpose
 *
 * @return  void
 */
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Method: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd("Request");
});

/**
 * Validade if name exist on HTTP::request
 *
 * @return  error | call next router
 */
function userBodyExist(req, res, next) {
  const userName = users[req.body.name];
  if (userName) {
    req.userName = userName;
    return next();
  } else {
    return res.status(400).json({
      error: "Username is required!"
    });
  }
}

/**
 * Validade if user exist.
 *
 * @return  error | call next router
 */
function userExists(req, res, next) {
  const user = users[req.query.id];
  const { index } = req.params;
  if (user) {
    req.user = user;
    req.index = index;
    return next();
  } else {
    return res.status(400).json({
      error: "User does not exists!"
    });
  }
}

/**
 * List all users from users sample array
 *
 * @return  All users
 */
server.get("/users", (req, res) => {
  return res.json(users);
});

/**
 * Set a router to http://server:listen_port/user
 * Router to show only one user
 *
 * @param { Query } HTTP::req
 * @param res
 *
 * @return  json { query.name res }
 */
server.get("/user", userExists, (req, res) => {
  const { id } = req.query;
  return res.json({ message: `Hello ${users[id]}` });
});

/**
 * Set a router to http://server:listen_port/user/add
 * Router to add a new user
 *
 * @param { body } HTTP::req
 * @param res
 *
 * @return  json { all users }
 */
server.post("/user/add", userBodyExist, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

/**
 * Set a router to http://server:listen_port/user/edit/:id
 * Router to edit an user
 *
 * @param { body } HTTP::req
 * @param res
 *
 * @return  json { all users }
 */
server.put("/user/edit/:id", userBodyExist, userExists, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  users[id] = name;
  return res.json(users);
});

/**
 * Set a router to http://server:listen_port/user/delete/:id
 * Router to delete an user from users sample array
 *
 * @param { param } HTTP::req
 * @param res
 *
 * @return  json { all users }
 */
server.delete("/user/delete/:id", userExists, (req, res) => {
  const { id } = req.params;
  users.splice(id, 1);
  return res.json(users);
});

/**
 * Set a router to http://server:listen_port/users/:id
 * Router to show a simple sample with params manipulation.
 *
 * @param { Query } HTTP::req
 * @param res
 *
 * @return  json { param.id res }
 */
server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  return res.json({ message: `Looking for user id:  ${id}` });
});

// All dependencies are added on a variable with require method(<dependece-name>)
import express from 'express';

// Create a new object from express
const server = express();

// Set server to allow HTTP::post json
server.use(express.json());

// Start a server on port 9090
server.listen(3333);

// User array sample
const users = ['Jonas', 'Diego', 'Marcela', 'Andressa'];

/**
 * Middleware::Log control purpose
 *
 * @return  void
 */
server.use((req, _, next) => {
  console.time('Request');
  console.log(`Method: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd('Request');
});

/**
 * Validade if name exist on HTTP::request
 *
 * @return  error | call next router
 */
function nameBodyExists(req, res, next) {
  const userName = req.body.name;
  if (userName) {
    req.userName = userName;
    return next();
  } else {
    return res.status(400).json({
      error: 'Username is required!',
    });
  }
}

/**
 * Get important request informations.
 */
function getReqInformations(req, _, next) {
  req.user = users[req.params.index];
  req.index = req.params.index;
  return next();
}

/**
 * Validade if user exist.
 *
 * @return  error | call next router
 */
function userExists(req, res, next) {
  if (users[req.index]) {
    return next();
  } else {
    return res.status(400).json({
      error: 'User does not exists!',
    });
  }
}

/**
 * Push a new user on users array
 *
 * @return The new user added to user array.
 */
function createUser(__userName) {
  users.push(__userName);
  return __userName;
}

/**
 * Update the username.
 *
 * @return the new user name.
 */
function updateUserName(__index, __userName) {
  users[__index] = __userName;
  return __userName;
}

/**
 * Delete a user from users array.
 *
 * @return sucess
 */
function deleteUser(__index) {
  users.splice(__index, 1);
  return 'sucess';
}

/**
 * List all users from users sample array
 *
 * @return  All users
 */
server.get('/users', (req, res) => {
  return res.json(users);
});

/**
 * Get a user from users array and show their name.
 *
 * @return  User name.
 */
server.get('/users/:index', getReqInformations, userExists, (req, res) => {
  return res.json({ name: `${req.user}` });
});

/**
 * Add a new user.
 *
 * @return  New user name.
 */
server.post('/user/add', getReqInformations, nameBodyExists, (req, res) => {
  return res.json(createUser(req.userName));
});

/**
 * Search a user from index, and update their name.
 *
 * @return  New username.
 */
server.put(
  '/user/:index/edit',
  getReqInformations,
  userExists,
  nameBodyExists,
  (req, res) => {
    return res.json(updateUserName(req.index, req.userName));
  }
);

/**
 * Router to delete an user from users sample array
 *
 * @return void
 */
server.delete(
  '/user/:index/delete',
  getReqInformations,
  userExists,
  (req, res) => {
    return res.json(deleteUser(req.index));
  }
);

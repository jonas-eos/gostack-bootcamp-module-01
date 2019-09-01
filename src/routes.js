/**
 * @overview routes
 * Application Routing
 *
 * This file initializes the links between route controllers and the express
 * HTTP routes.
 *
 * @require express
 */
import { Router } from 'express';

const routes = new Router();

// User array sample
const users = ['Jonas', 'Diego', 'Marcela', 'Andressa'];

/**
 * @method nameBodyExists
 * Get the name attribute on request body. Check if exist a name and set request
 * userName attribute. Else, return a erro to the user.
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
 * @method getReqInformations
 * Get user params request and index params request and set a new request attr.
 */
function getReqInformations(req, _, next) {
  req.user = users[req.params.index];
  req.index = req.params.index;
  return next();
}

/**
 * @method userExists
 * Validade if user in index pass by request exist and call next procedure, else
 * call a error.
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
 * @method create_user
 * Push a new user on users array.
 *
 * @return the username
 */
function createUser(__userName) {
  users.push(__userName);
  return __userName;
}

/**
 * @method updateUserName
 * Update the username.
 *
 * @param __index - the index position where username will be changed.
 * @param __userName - the new username to save.
 *
 * @return The new __username
 */
function updateUserName(__index, __userName) {
  users[__index] = __userName;
  return __userName;
}

/**
 * @method deleteUser
 * Delete a user from users array.
 *
 * @param __index - the index position to be deleted.
 *
 * @return sucess message
 */
function deleteUser(__index) {
  users.splice(__index, 1);
  return 'sucess';
}

// List all users
routes.get('/users', (_, res) => {
  return res.json(users);
});

// List a user by index params
routes.get('/users/:index', getReqInformations, userExists, (req, res) => {
  return res.json({ name: `${req.user}` });
});

// Add a new user
routes.post('/user/add', getReqInformations, nameBodyExists, (req, res) => {
  return res.json(createUser(req.userName));
});

// Update the username in index position
routes.put(
  '/user/:index/edit',
  getReqInformations,
  userExists,
  nameBodyExists,
  (req, res) => {
    return res.json(updateUserName(req.index, req.userName));
  }
);

// Delete a user by index.
routes.delete(
  '/user/:index/delete',
  getReqInformations,
  userExists,
  (req, res) => {
    return res.json(deleteUser(req.index));
  }
);

export default routes;

// All dependencies are added on a variable with require method(<dependece-name>)
const express = require("express");

// Create a new object from express
const server = express();

/**
 * Set a router to http://server:listen_port/teste
 *
 * @param HTTP::__request
 * @param __response
 *
 * @return  json { array __response }
 */

server.get("/teste", (__request, __response) => {
  return __response.json({ message: "Hello World" });
});

// Start a server on port 9090
server.listen(9090);

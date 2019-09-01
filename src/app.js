/**
 * @overview src
 * Module 01 GoStack bootcamp exercise
 *
 * This is a server of bootcamp exercise. It is responsible for setting up the
 * HTTP server. These are global throughout the applicatoin, and are configured
 * here.
 *
 * The application routes are configured in {@link src/routes}, while
 * the middleware is configured in {@link src/app.js}, and
 * server states in {@link src/server}
 *
 * @require express
 *
 * @require ./routes
 *
 * @license MIT
 */
import express from 'express';

import routes from './routes';

class App {
  /**
   * @constructor
   *
   * @description
   * Create a new express server and start middlewares and routes.
   */
  constructor() {
    this.server = express();

    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());

    /**
     * Middleware::Log control purpose
     *
     * @return  void
     */
    this.server.use((req, _, next) => {
      console.time('Request');
      console.log(`Method: ${req.method}; URL: ${req.url}`);
      next();
      console.timeEnd('Request');
    });
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;

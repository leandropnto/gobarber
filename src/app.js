import express from 'express';
import { resolve } from 'path';
import * as Sentry from '@sentry/node';

import routes from './routes';
import './database';
import sentryConfig from './config/sentry';

import 'express-async-errors';

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);

    this.midlewares();
    this.routes();
  }

  midlewares() {
    // The request handler must be the first middleware on the app
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    // The error handler must be before any other error middleware
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {});
  }
}
export default new App().server;

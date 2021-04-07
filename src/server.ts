import Koa, { Context, DefaultState } from 'koa';
// import jwt from 'koa-jwt';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import winston from 'winston';
import 'reflect-metadata';

import { logger } from './logger';
import { config } from './config';
import { unprotectedRouter } from './unprotectedRoutes';
import { protectedRouter } from './protectedRoutes';
// import { cron } from './cron';
import connectDB from './config/db';
import passport from './auth/passport';
import dotenv from 'dotenv';
import Router from '@koa/router';
import { RContext } from './types';
import session from 'koa-session';
import moment from 'moment';

dotenv.config();

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
connectDB()
  .then(async () => {
    const app = new Koa();

    app.keys = [config.appSecret];
    // Provides important security headers to make your app more secure
    app.use(helmet());

    // Enable cors with default options
    app.use(cors({ credentials: true, origin: process.env.SERVER_ORIGIN }));

    // Logger middleware -> use winston as logger (logging.ts with config)
    app.use(logger(winston));

    // Enable bodyParser with default options
    app.use(bodyParser());

    app.use(
      session(
        {
          key: 'app.sess' /** (string) cookie key (default is koa.sess) */,
          maxAge: moment.duration(14, 'days').asMilliseconds(),
          rolling: true /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
          renew: true /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
        },
        app,
      ),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    const apiRouter = new Router<DefaultState, Context>({ prefix: '/api' });

    // these routes are NOT protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
    apiRouter.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

    // JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
    // do not protect swagger-json and swagger-html endpoints
    // app.use(jwt({ secret: config.jwtSecret }));

    apiRouter.use(async (ctx: RContext, next) => {
      if (!ctx.isAuthenticated()) {
        ctx.status = 401;
        return;
      }
      await next();
    });

    apiRouter.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

    app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

    // Register cron job to do any action needed
    // cron.start();

    app.listen(config.port);

    console.log(`Server running on port ${config.port}`);
  })
  .catch((error: string) => console.log('Mongodb connection error: ', error));

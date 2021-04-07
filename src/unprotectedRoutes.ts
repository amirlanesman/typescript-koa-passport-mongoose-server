import Router from '@koa/router';
import { Context, DefaultState } from 'koa';
import { authRouter } from './authRoutes';
import { general } from './controller';

const unprotectedRouter = new Router<DefaultState, Context>();

// Hello World route
unprotectedRouter.get('/', general.helloWorld);
unprotectedRouter.use(authRouter.routes()).use(authRouter.allowedMethods());

export { unprotectedRouter };

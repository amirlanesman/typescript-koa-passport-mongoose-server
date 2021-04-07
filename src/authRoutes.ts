import Router from '@koa/router';
import { DefaultState } from 'koa';
import { Context } from 'node:vm';
import passport from './auth/passport';
import { auth } from './controller';

export const authRouter = new Router<DefaultState, Context>({ prefix: '/auth' });

// Hello World route
authRouter.get('/user', auth.getUser);
authRouter.post('/signup', auth.signup, passport.authenticate('local'), auth.getUser);
authRouter.post('/login', passport.authenticate('local'), auth.getUser);
authRouter.post('/logout', auth.logout);

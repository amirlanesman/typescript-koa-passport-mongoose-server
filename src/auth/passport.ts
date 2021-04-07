import passport from 'koa-passport';
import { User } from '../entity/user';

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default passport;

import { IUser, User } from '../entity/user';
import { RContext } from '../types';

const toUser = (user: IUser | undefined) =>
  user
    ? {
        id: user._id,
        username: user.username,
      }
    : undefined;

export default class AuthController {
  public static async getUser(ctx: RContext): Promise<void> {
    ctx.body = { user: toUser(ctx.state.user) };
  }

  public static async signup(ctx: RContext, next: () => Promise<any>): Promise<void> {
    const { username, password } = ctx.request.body;
    try {
      await User.register(new User({ username }), password);
      await next();
    } catch (error) {
      if (error.name === 'UserExistsError') {
        ctx.status = 400;
        ctx.body = { message: 'UserExistsError' };
      } else {
        ctx.body = { message: 'There was an error when signing up the user' };
      }
    }
  }

  public static async logout(ctx: RContext): Promise<void> {
    ctx.logout();
    ctx.body = { status: 'success' };
  }
}

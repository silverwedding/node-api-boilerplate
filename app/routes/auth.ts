import jwt from 'jsonwebtoken';
import passport from 'koa-passport';
import Router from 'koa-router';
import {
  INVALID_CREDENTIALS,
  LOGIN_AUTH_FAILED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
} from '../errors/auth';
import { validateCredentials } from '../validation/user';

const router = new Router({
  prefix: '/auth',
});

router.post('/signup', async (ctx, next) => {
  const { email, password } = ctx.request.body;

  if (!validateCredentials(email, password)) {
    ctx.body = {
      message: SIGNUP_FAILED,
      success: false,
    };
    ctx.status = 400;

    return;
  }

  return passport.authenticate('signup', { session: false }, (err, user) => {
    if (err || !user) {
      ctx.body = {
        message: SIGNUP_FAILED,
        success: false,
      };
      ctx.status = 400;

      return;
    }

    ctx.body = {
      message: SIGNUP_SUCCESS,
      success: true,
    };
    ctx.status = 201;
  })(ctx, next);
});

router.post('/login', async (ctx, next) => {
  const { email, password } = ctx.request.body;

  if (!validateCredentials(email, password)) {
    ctx.body = {
      message: INVALID_CREDENTIALS,
      success: false,
    };
    ctx.status = 400;

    return;
  }

  return passport.authenticate(
    'login',
    { session: false },
    (err, user, info) => {
      if (err || !user) {
        ctx.body = {
          message: LOGIN_AUTH_FAILED,
          success: false,
        };
        ctx.status = 401;

        return;
      }

      try {
        ctx.login(user, { session: false });
        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.APP_SECRET);

        ctx.body = {
          message: LOGIN_SUCCESS,
          success: true,
          token,
        };
        ctx.status = 201;
      } catch (e) {
        ctx.body = {
          message: LOGIN_FAILED,
          success: false,
        };
        ctx.status = 400;
      }
    },
  )(ctx, next);
});

export default router;

import { compareSync } from 'bcryptjs';
import passport from 'koa-passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import uuidv4 from 'uuid/v4';
import { User } from './orm/models/schema/User';
import { IUser } from './orm/models/User';

const options = {
  passwordField: 'password',
  usernameField: 'email',
};

passport.serializeUser((user: IUser, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.query().findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  'signup',
  new LocalStrategy(options, async (email, password, done) => {
    try {
      const user = await User.query().insert({ email, password, id: uuidv4() });
      if (user) {
        return done(null, user);
      }

      done('USER_DETAILS_INVALID');
    } catch (error) {
      done(error);
    }
  }),
);

passport.use(
  'login',
  new LocalStrategy(options, async (email, password, done) => {
    try {
      const user = await User.query()
        .where({ email })
        .first();

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      // TODO: investigate
      if (password === user.password || comparePass(password, user.password)) {
        return done(null, user, { message: 'Logged in Successfully' });
      }

      return done(null, false);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_SECRET,
    },
    async (token, done) => {
      try {
        // Pass the user details to the next middleware
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

function comparePass(userPassword, databasePassword): boolean {
  return compareSync(userPassword, databasePassword);
}

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import passport from 'koa-passport';
import { getResponseTime, logResponseTime } from './middleware';
import router from './routes';
import authRouter from './routes/auth';

const app = new Koa();

// Parsers
app.use(bodyParser());
app.use(json());

// Authentication
import './auth';

app.use(passport.initialize());

// loggers
if (process.env.RESPONSE_TIME === 'true') {
  app.use(logResponseTime);
  app.use(getResponseTime);
}
if (process.env.LOGGER === 'true') {
  app.use(logger());
}

// Routes
app.use(authRouter.routes());
app.use(passport.authenticate('jwt', { session: false }));
app.use(router());

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

export default app;

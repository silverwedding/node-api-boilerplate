import combineRouters from 'koa-combine-routers';
import rootRouter from './root';

export default combineRouters(
  rootRouter,
);

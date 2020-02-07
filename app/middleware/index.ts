
import { ParameterizedContext } from 'koa';

export async function logResponseTime(
  ctx: ParameterizedContext,
  next,
): Promise<void> {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.info(`${ctx.method} ${ctx.url} - ${rt}`);
}

export async function getResponseTime(
  ctx: ParameterizedContext,
  next,
): Promise<void> {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
}

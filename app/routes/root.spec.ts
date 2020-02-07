import request from 'supertest';
import app from '../app';

const server = app.listen();
request.agent(server);

afterEach(async () => {
  await server.close();
});

test('root route', async () => {
  const response = await request(app.callback()).get('/');
  expect(response).toBeDefined(); // @TODO
});

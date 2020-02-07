process.env.NODE_ENV = 'test';

import request from 'supertest';
import app from '../app';
import { knexConnection } from '../orm/connection';
import { User } from '../orm/models/schema/User';
import { createFakeUsers } from '../orm/seeds/users';

const server = app.listen();
request.agent(server);

describe('auth routes', () => {
  // For some reason this fails when not set as variable first ??
  const userTable = User.query();

  afterEach(async () => {
    await knexConnection('users').del();
  });

  afterAll(async () => {
    server.close();
    await knexConnection.destroy();
  });

  describe('POST /auth/signup', () => {
    test('should register a new user', async () => {
      const [user] = createFakeUsers(1);
      const response = await request(app.callback())
        .post(`/auth/signup`)
        .send(user);
      expect(response).toBeDefined();
      expect(response.status).toEqual(201);
      expect(response.body).toStrictEqual({
        message: 'SIGNUP_SUCCESS',
        success: true,
      });
    });
  });

  describe('POST /auth/login', () => {
    test('should login a user', async () => {
      const [user] = createFakeUsers(1);
      const { email, password } = user;
      await userTable.insertGraph(user);

      const response = await request(app.callback())
        .post(`/auth/login`)
        .send({ email, password });
      expect(response).toBeDefined();
      expect(response.body).toHaveProperty('token');
    });
  });
});

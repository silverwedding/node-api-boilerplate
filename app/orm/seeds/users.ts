import faker from 'faker';
import * as Knex from 'knex';
import uuidv4 from 'uuid/v4';
import { IUser } from '../models/User';

export function createFakeUserAccount(): IUser {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    email: faker.internet.email(firstName, lastName),
    id: uuidv4(),
    password: faker.internet.password(),
  };
}

export function createFakeUser(): IUser {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    email: faker.internet.email(firstName, lastName),
    firstName,
    id: uuidv4(),
    lastName,
    password: faker.internet.password(),
  };
}

export function createFakeUsers(num: number): IUser[] {
  const users = [];

  for (let i = 0; i < num; i++) {
    users.push(createFakeUser());
  }

  return users;
}

exports.seed = async (knex: Knex): Promise<any> => {
  // Deletes ALL existing entries
  await knex('users').del();

  return knex('users').insert([]);
};

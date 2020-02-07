import { config as dotEnv } from 'dotenv';
import { Config } from 'knex';
import path from 'path';
dotEnv();

const BASE_PATH = path.join(__dirname);

export const config = {
  development: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}postgres`,
    dbManager: {
      superPassword: 'docker',
      superUser: 'postgres',
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
      extension: 'ts',
      loadExtensions: ['.js'],
      stub: `${path.join(BASE_PATH, 'migrations')}/migration.stub`,
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
      extension: 'ts',
      loadExtensions: ['.js'],
      stub: `${path.join(BASE_PATH, 'seeds')}/seed.stub`,
    },
  },
  test: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}postgres`,
    dbManager: {
      superPassword: '',
      superUser: 'root',
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
      extension: 'ts',
      loadExtensions: ['.js'],
      stub: `${path.join(BASE_PATH, 'migrations')}/migration.stub`,
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
      extension: 'ts',
      loadExtensions: ['.js'],
      stub: `${path.join(BASE_PATH, 'seeds')}/seed.stub`,
    },
  },
} as Config;

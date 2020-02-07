import knex from 'knex';
import { Model } from 'objection';
import { config as configs } from './config';

const environment = process.env.NODE_ENV || 'development';
const config = configs[environment];
export const knexConnection = knex(config);

Model.knex(knexConnection);

export default Model;

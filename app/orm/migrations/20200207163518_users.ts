
import * as Knex from 'knex';

exports.up = (knex: Knex) =>
  knex.schema.createTable('users', table => {
    table.uuid('id').primary();
    table.string('firstName');
    table.string('lastName');
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
  });

exports.down = (knex: Knex) => knex.schema.dropTable('users');

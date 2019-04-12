'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserPreferencesSchema extends Schema {
  up() {
    this.create('user_preferences', table => {
      table.increments();
      table.integer('preference_id').unsigned();
      // .index('preference_id');
      table.integer('user_id').unsigned();
      // .index('user_id');
      table
        .foreign('preference_id')
        .references('id')
        .inTable('preferences')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('user_preferences');
  }
}

module.exports = UserPreferencesSchema;

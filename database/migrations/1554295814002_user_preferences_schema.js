'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserPreferencesSchema extends Schema {
  up() {
    this.create('user_preferences', table => {
      table.increments();
      table.integer('user_id');
      table.integer('preference_id');
      table.timestamps();
    });
  }

  down() {
    this.drop('user_preferences');
  }
}

module.exports = UserPreferencesSchema;

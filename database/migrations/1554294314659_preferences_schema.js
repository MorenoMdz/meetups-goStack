'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PreferencesSchema extends Schema {
  up() {
    this.create('preferences', table => {
      table.increments();
      table.string('name');
      table.string('description');
      table.timestamps();
    });
  }

  down() {
    this.drop('preferences');
  }
}

module.exports = PreferencesSchema;

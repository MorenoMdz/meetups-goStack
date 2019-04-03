'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MeetupPreferencesSchema extends Schema {
  up() {
    this.create('meetup_preferences', table => {
      table.increments();
      table
        .integer('meetup_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('meetups')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.string('technology').notNullable();
      table.string('description');
      table.timestamps();
    });
  }

  down() {
    this.drop('meetup_preferences');
  }
}

module.exports = MeetupPreferencesSchema;

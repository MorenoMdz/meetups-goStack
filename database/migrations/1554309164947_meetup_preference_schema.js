'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MeetupPreferenceSchema extends Schema {
  up() {
    this.create('meetup_preferences', table => {
      table.increments();
      table.integer('preference_id').unsigned();
      // .index('preference_id');
      table.integer('meetup_id').unsigned();
      // .index('meetup_id');
      table
        .foreign('preference_id')
        .references('id')
        .inTable('preferences')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .foreign('meetup_id')
        .references('id')
        .inTable('meetups')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('meetup_preferences');
  }
}

module.exports = MeetupPreferenceSchema;

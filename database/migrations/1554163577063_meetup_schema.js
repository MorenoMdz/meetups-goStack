'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MeetupSchema extends Schema {
  up() {
    this.create('meetups', table => {
      table.increments();
      table
        .integer('user_id') // * Owner id
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('file_id') // * Cover string
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.string('title').notNullable(); // * Title string
      table.text('description').notNullable(); // * Description string
      table.timestamp('event_date'); // * Event date timestamp
      // table.timestamp('event_date');

      table.timestamps();
      /*

      * Participants [ ] // relation
      * Preferences [] // relation
      * Local {
        * Place string
        * City string
        * State string
      }
      */
    });
  }

  down() {
    this.drop('meetups');
  }
}

module.exports = MeetupSchema;

'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MeetupSchema extends Schema {
  up() {
    this.create('meetups', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.timestamp('event_date');
      table.timestamps();
      /*
      * Created at timestamp
      * Event date timestamp
      * Event time timestamp
      * Owner id
      * Participants [ ]
      * Local {
        * Place string
        * City string
        * State string
      }
      * Types [ Front-end, Back-end, Mobile, DevOps ]
      * Cover string
      * Title string
      * Description string
      */
    });
  }

  down() {
    this.drop('meetups');
  }
}

module.exports = MeetupSchema;

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
      table
        .string('title')
        .notNullable()
        .unique();
      table.text('description').notNullable();
      table.timestamp('event_date');
      table.timestamps();
      /*
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

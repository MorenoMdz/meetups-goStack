'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MeetupAddressSchema extends Schema {
  up() {
    this.create('meetup_addresses', table => {
      table.increments();
      table
        .integer('meetup_id')
        .unsigned()
        .references('id')
        .inTable('meetups')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.string('street').notNullable();
      table.integer('number').notNullable();
      table.string('district');
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('meetup_addresses');
  }
}

module.exports = MeetupAddressSchema;

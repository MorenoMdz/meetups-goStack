'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Meetup extends Model {
  static boot() {
    super.boot();

    // send email when a new Meetup is made or updated
    this.addHook('afterCreate', 'MeetupHook.sendMailNotification');
    this.addHook('beforeUpdate', 'MeetupHook.sendMailNotification');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  file() {
    return this.belongsTo('App/Models/File');
  }

  preferences() {
    return this.hasMany('App/Models/MeetupPreference');
  }
}

module.exports = Meetup;

'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Meetup extends Model {
  static boot() {
    super.boot();

    this.addHook('afterCreate', 'MeetupHook.sendMailNotification');
    // this.addHook('beforeUpdate', 'MeetupHook.sendMailNotification');
  }

  file() {
    return this.belongsTo('App/Models/File');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  preferences() {
    return this.belongsToMany('App/Models/Preference')
      .pivotTable('meetup_preferences')
      .pivotModel('App/Models/MeetupPreference');
  }

  users() {
    return this.belongsToMany('App/Models/User')
      .pivotTable('user_meetup')
      .pivotModel('App/Models/UserMeetup');
  }

  address() {
    return this.hasMany('App/Models/MeetupAddress');
  }
}

module.exports = Meetup;

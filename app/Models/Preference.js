'use strict';

const Model = use('Model');

class Preference extends Model {
  meetups() {
    return this.belongsToMany('App/Models/Meetup')
      .pivotTable('meetup_preferences')
      .pivotModel('App/Models/MeetupPreference');
  }

  users() {
    return this.belongsToMany('App/Models/User')
      .pivotTable('user_preferences')
      .pivotModel('App/Models/UserPreference');
  }
}

module.exports = Preference;

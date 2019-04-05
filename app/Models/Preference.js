'use strict';

const Model = use('Model');

class Preference extends Model {
  meetups() {
    return this.belongsToMany('App/Models/Meetup')
      .pivotTable('meetup_preferences')
      .pivotModel('App/Models/MeetupPreference');
  }
}

module.exports = Preference;

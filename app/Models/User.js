'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class User extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }

  // preferences() {
  //   return this.belongsToMany('App/Models/Preference')
  //     .pivotTable('meetup_prefrences')
  //     .pivotModel('App/Models/UserPreference');
  // }

  // meetups() {
  //   return this.belongsToMany('App/Models/Meetup')
  //     .pivotTable('user_meetup')
  //     .pivotModel('App/Models/UserMeetup');
  // }
}

module.exports = User;

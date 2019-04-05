'use strict';

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const User = use('App/Models/User');

class UserSeeder {
  // async run() {
  //   try {
  //     await User.create({
  //       username: 'morenomdz',
  //       email: 'morenomdz@gmail.com',
  //       password: '123',
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

module.exports = UserSeeder;

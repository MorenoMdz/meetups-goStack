'use strict';

const User = use('App/Models/User');

class UserController {
  // taking "request" from the ctx object
  async store({ request }) {
    const data = request.only(['username', 'email', 'password']);

    const user = await User.create(data);

    return user;
  }
}

module.exports = UserController;

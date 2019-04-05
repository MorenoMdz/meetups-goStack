'use strict';

const User = use('App/Models/User');

class UserController {
  // taking "request" from the ctx object
  async store({ request }) {
    const data = request.only(['name', 'email', 'password']);

    const user = await User.create(data);

    return user;
  }

  async show({ params }) {
    const user = await User.findOrFail(params.id);

    // await meetup.load('user');
    // await meetup.load('file');

    user.preferences = await user.preferences().fetch();

    return user;
  }

  async update({ params, request, response }) {
    const user = await User.findOrFail(params.id);
    const {
      name,
      preferences,
      password,
      password_confirmation,
    } = request.post();

    if (preferences && preferences.length > 0) {
      await user.preferences().sync(preferences);
    }

    if (password && password === password_confirmation) {
      user.password = password;
    } else {
      return response.status(401).send({
        error: { message: 'A confirmação de senha não confere.' },
      });
    }

    await user.merge({ name });
    await user.preferences().sync(preferences);

    await user.save();

    user.preferences = await user.preferences().fetch();

    return user;
  }
}

module.exports = UserController;

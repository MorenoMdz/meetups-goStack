'use strict';

const User = use('App/Models/User');

class UserController {
  async store({ request }) {
    const data = request.only(['name', 'email', 'password']);

    const user = await User.create(data);

    return user;
  }

  async show({ params }) {
    const user = await User.findOrFail(params.id);

    user.preferences = await user.preferences().fetch();

    console.log('fetching user with id', user.id);

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

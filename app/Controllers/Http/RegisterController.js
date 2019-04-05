'use strict';

const Meetup = use('App/Models/Meetup');

class RegisterController {
  async store({ params, response, auth }) {
    const meetup = await Meetup.findOrFail(params.id);
    const user = auth.user;

    await meetup.users().attach(user.id);

    await meetup.save();

    return response.status(200).send({
      success: {
        message: `Registro do usuário ${user.name} adicionado ao meetup ${
          meetup.title
        } com sucesso!`,
      },
    });
  }

  async destroy({ params, response, auth }) {
    const user_id = auth.user.id;
    const meetup = await Meetup.findOrFail(params.id);

    const users = (await meetup.users().fetch()).toJSON();
    const updatedUsers = users.filter(user => user.id !== user_id);

    await meetup.users().sync(updatedUsers);

    await meetup.save();

    return response.status(200).send({
      success: { message: 'Registro do user no meetup removido com sucesso.' },
    });
  }
}

module.exports = RegisterController;

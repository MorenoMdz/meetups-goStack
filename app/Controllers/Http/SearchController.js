'use strict';

const Meetup = use('App/Models/Meetup');

class SearchController {
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
}

module.exports = SearchController;

'use strict';

const Env = use('Env');
const Kue = use('Kue');
const Job = use('App/Jobs/MeetupRegitrationMail');

const Meetup = use('App/Models/Meetup');

class MeetupRegistration {
  async store({ params, response, auth }) {
    const meetup = await Meetup.findOrFail(params.id);
    const user = auth.user;

    await meetup.users().attach(user.id);

    await meetup.save();

    Kue.dispatch(
      Job.key,
      {
        email: user.email,
        name: user.name,
        title: meetup.title,
        link: `http://${Env.get('HOST')}:3333/meetups/${meetup.id}`,
      },
      {
        attempts: 3,
      }
    );

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

    await meetup.users().detach(user_id);

    await meetup.save();

    return response.status(200).send({
      success: { message: 'Registro do user no meetup removido com sucesso.' },
    });
  }
}

module.exports = MeetupRegistration;

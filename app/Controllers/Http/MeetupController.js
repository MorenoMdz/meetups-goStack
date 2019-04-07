'use strict';

const Meetup = use('App/Models/Meetup');

class MeetupController {
  async index({ request }) {
    const { page } = request.get();
    // DOC to be called with 'meetups?page=2'

    const meetups = await Meetup.query()
      .with('user', builder => builder.select('id', 'name'))
      .with('file')
      .paginate(page);

    return meetups;
  }

  async store({ request, auth }) {
    const {
      title,
      description,
      event_date,
      file_id,
      preferences,
    } = request.post();

    const meetup = await Meetup.create({
      title,
      description,
      event_date,
      file_id,
      user_id: auth.user.id,
    });

    if (preferences && preferences.length > 0) {
      await meetup.preferences().attach(preferences);
      meetup.preferences = await meetup.preferences().fetch();
    }

    return meetup;
  }

  async show({ params }) {
    const meetup = await Meetup.findOrFail(params.id);

    await meetup.load('user');
    await meetup.load('file');

    meetup.preferences = await meetup.preferences().fetch();
    meetup.users = await meetup.users().fetch();

    return meetup;
  }

  async update({ params, request }) {
    const meetup = await Meetup.findOrFail(params.id);
    const { title, description, file_id, preferences } = request.post();

    await meetup.merge({ title, description, file_id });
    await meetup.preferences().sync(preferences);

    await meetup.save();

    meetup.preferences = await meetup.preferences().fetch();

    return meetup;
  }

  async destroy({ params, response }) {
    const meetup = await Meetup.findOrFail(params.id);

    await meetup.delete();

    return response
      .status(200)
      .send({ success: { message: 'Meetup removido com sucesso' } });
  }
}

module.exports = MeetupController;

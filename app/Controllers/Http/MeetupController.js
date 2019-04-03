'use strict';

const Database = use('Database');
const Meetup = use('App/Models/Meetup');

class MeetupController {
  async index({ request }) {
    const { page } = request.get();

    const meetups = await Meetup.query()
      .with('user')
      .paginate(page);
    // DOC to be called with 'meetups?page=2'
    // todo not return password

    return meetups;
  }

  async store({ request, auth }) {
    const data = request.only([
      'title',
      'description',
      'file_id' /*  'event_date'..., */,
    ]);
    const preferences = request.input('preferences');

    const trx = await Database.beginTransaction();

    // if (!data.file_id) data.file_id = 1; // TODO default pic

    const meetup = await Meetup.create({ ...data, user_id: auth.user.id }, trx);

    await meetup.preferences().createMany(preferences, trx);

    await trx.commit();

    return meetup;
  }

  async show({ params }) {
    const meetup = await Meetup.findOrFail(params.id);

    await meetup.load('user');
    await meetup.load('file');

    return meetup;
  }

  async update({ params, request }) {
    const meetup = await Meetup.findOrFail(params.id);
    const data = request.only(['title', 'description', 'file_id']);

    meetup.merge(data);

    await meetup.save();

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

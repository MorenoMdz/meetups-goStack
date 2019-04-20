'use strict';

const moment = use('moment');

const Meetup = use('App/Models/Meetup');
const User = use('App/Models/User');

class SearchController {
  async meetupsByTitle({ request }) {
    const { title } = request.get();
    const { page } = request.get() || 1;
    const meetups = await Meetup.query()
      .where(`title`, `like`, `%${title}%`)
      .paginate(page);
    return meetups;
  }

  async meetupsRegistered({ request, auth }) {
    const logged_user = await auth.getUser();
    const user_id = logged_user.id;
    const { page } = request.post() || 1;
    const user = await User.findOrFail(user_id);
    const meetupsRegistered = await user.meetups().paginate(page, 3);
    return meetupsRegistered;
  }

  async meetupsRegisteredSoon({ request, auth }) {
    const logged_user = await auth.getUser();
    const user_id = logged_user.id;
    const user = await User.findOrFail(user_id);
    const now = moment().format('MM/DD/YYYY');
    const soon = moment()
      .add(14, 'days')
      .calendar();

    const { page } = request.get() || 1;
    const perPage = 3;
    const meetupsSoon = await user
      .meetups()
      .whereRaw(`event_date <= '${soon}' AND event_date >= '${now}'`)
      .paginate(page, perPage);
    return meetupsSoon;
  }

  async meetupsNotRegistered({ request, auth }) {
    const logged_user = await auth.getUser();
    const user_id = logged_user.id;
    const now = moment().format('YYYY-MM-DD HH:mm');
    const { page } = request.get() || 1;
    const perPage = 3;
    const meetups = await Meetup.query()
      .whereRaw(`event_date >= '${now}'`)
      .with('users')
      .with('preferences')
      .whereDoesntHave('users', builder => builder.where('user_id', user_id))
      .paginate(page, perPage);
    return meetups;
  }

  async meetupsNotRegisteredRecommended({ request, auth }) {
    const now = moment().format('YYYY-MM-DD HH:mm');
    const logged_user = await auth.getUser();
    const user_id = logged_user.id;
    const user = await User.findOrFail(user_id);
    const { page } = request.get() || 1;
    const perPage = 3;
    const preferences = (await user.preferences().fetch())
      .toJSON()
      .map(preference => preference.id);
    const meetups = await Meetup.query()
      .whereRaw(`event_date >= '${now}'`)
      .with('users')
      .with('preferences')
      .whereDoesntHave('users', builder => builder.where('user_id', user_id))
      .whereHas('preferences', builder =>
        builder.whereIn('preferences.id', preferences)
      )
      .paginate(page, perPage);
    return meetups;
  }
}

module.exports = SearchController;

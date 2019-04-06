'use strict';

const Meetup = use('App/Models/Meetup');
const User = use('App/Models/User');

class SearchController {
  async meetupsByTitle({ request }) {
    const { title } = request.post();

    const meetups = await Meetup.query()
      .where(`title`, `like`, `%${title}%`)
      .fetch();
    return meetups;
  }

  async meetupsRegistered({ auth }) {
    const user_id = auth.user.id;
    const user = await User.findOrFail(user_id);
    const meetupsRegistered = await user.meetups().fetch();

    return meetupsRegistered;
  }

  async meetupsNotRegistered({ request, auth }) {
    // find user
    const user_id = auth.user.id;
    const { page } = request.post() || 1;

    const meetups = await Meetup.query()
      .with('users', builder => builder.select('id', 'name'))
      .with('file')
      .paginate(page);

    return meetups;
  }
}

module.exports = SearchController;

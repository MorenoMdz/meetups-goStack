'use strict';

const Preference = use('App/Models/Preference');

class PreferenceController {
  async index({}) {
    const preferences = await Preference.query().fetch();

    return preferences;
  }

  async store({ request }) {
    const { name, description } = request.post();

    const preference = await Preference.create({
      name,
      description,
    });

    return preference;
  }
}

module.exports = PreferenceController;

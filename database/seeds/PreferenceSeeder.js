'use strict';

const Preference = use('App/Models/Preference');

class PreferenceSeeder {
  async run() {
    const preferences = [
      {
        name: 'Front-end',
        description: 'Coisa bonita de ver.',
      },
      {
        name: 'Back-end',
        description: 'Coisa escondida no servidor.',
      },
      {
        name: 'DevOps',
        description: 'Coisa de Hackers.',
      },
      {
        name: 'Mobile',
        description: 'Coisa andando.',
      },
      {
        name: 'Gestão',
        description: 'Coisa de CEO.',
      },
      {
        name: 'Marketing',
        description: 'Pra vender coisas.',
      },
    ];

    try {
      for (let i = 0; i < preferences.length; i++) {
        await Preference.create({
          name: preferences[i].name,
          description: preferences[i].description,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PreferenceSeeder;

'use strict';

const Mail = use('Mail');

class MeetupRegitrationMail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return 'MeetupRegitrationMail-job';
  }

  async handle({ email, name, title, link }) {
    console.log(`Job: MeetupRegitrationMail started`);

    await Mail.send(
      ['emails.meetup_registration'],
      {
        email,
        name,
        title,
        link,
      },
      message => {
        message
          .to(email)
          .from('admin@meetapp.com', 'Admin | Meetapp')
          .subject(`Confirmação de inscrição no meetup ${title}`);
      }
    );
  }
}

module.exports = MeetupRegitrationMail;

'use strict';

const Mail = use('Mail');
const Helpers = use('Helpers');

class NewTaskMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 5;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'NewTaskMail-job';
  }

  // This is where the work is done.
  async handle({ email, username, title, file }) {
    console.log(`Job: ${NewTaskMail.key}`);

    await Mail.send(
      ['emails.forgot_password'], //todo change
      {
        username,
        title /* hasAttatchment: !!file */,
        link: 'test',
        token: 'tokentest',
      },
      message => {
        message
          .to(email)
          .from('admin@meetups-gostack.com', 'Admin | Meetapp goStack')
          .subject('Test email');
      }
    );
  }
}

module.exports = NewTaskMail;

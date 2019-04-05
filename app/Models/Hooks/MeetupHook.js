'use strict';

const Kue = use('Kue');
const Job = use('App/Jobs/NewTaskMail');

const MeetupHook = (exports = module.exports = {});

MeetupHook.sendMailNotification = async meetupInstance => {
  const { email, username } = await meetupInstance.user().fetch();
  const { title } = meetupInstance;
  Kue.dispatch(
    Job.key,
    { email, username, title },
    {
      attempts: 3,
    }
  );
};

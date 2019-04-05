'use strict';

const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'Hello World from the Meetups API' };
});

Route.post('users', 'UserController.store').validator('User');
Route.post('sessions', 'SessionController.store').validator('Session');

Route.post('forgot', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
);
Route.put('forgot', 'ForgotPasswordController.update').validator(
  'ResetPassword'
);

Route.get('files/:id', 'FileController.show');

Route.get('preferences', 'PreferenceController.index');
Route.post('preferences', 'PreferenceController.store');

/* Authenticated Routes */
Route.group(() => {
  // TODO resource routes User
  Route.get('users/:id', 'UserController.show');
  Route.put('users/:id', 'UserController.update');

  Route.resource('meetups', 'MeetupController')
    .apiOnly()
    .validator(
      new Map([
        [['meetups.store'], ['Meetup']],
        [['meetups.update'], ['Meetup']],
      ])
    );
  Route.post('files', 'FileController.store');
}).middleware(['auth']);

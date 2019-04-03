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

/* Authenticated Routes */
Route.group(() => {
  Route.post('files', 'FileController.store');

  Route.resource('meetups', 'MeetupController')
    .apiOnly()
    .validator(
      new Map([
        [['meetups.store'], ['Meetup']],
        // [['meetups.update'], ['Meetup']], TODO
      ])
    );
}).middleware(['auth']);

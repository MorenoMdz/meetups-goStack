'use strict';

class Meetup {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: 'required',
      description: 'required',
      // event_date: 'date'
    };
  }
}

module.exports = Meetup;

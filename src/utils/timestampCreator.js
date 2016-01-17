'use strict';

const moment = require('moment');
const chrono = require('chrono-node');

module.exports = (timestamp) => {
  let unix, natural, time;

  if (/[a-z]/gi.test(timestamp)) {
    time = moment(chrono.parse(timestamp)[0].start.date());
  } else {
    time = moment.unix(+timestamp);
  }

  if (time.isValid()) {
    unix = time.unix();
    natural = time.format('MMMM Do, YYYY')
  } else {
    unix = null;
    natural = null;
  }

  return {
    unix,
    natural
  };
}

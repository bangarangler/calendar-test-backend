const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  allDay: {
    type: Boolean,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Event', eventSchema);

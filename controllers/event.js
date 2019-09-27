const Event = require('../models/event.js');

exports.getEvents = async (req, res, next) => {
  const events = await Event.find({}, (err, events) => {
    if (err) {
      console.log(err);
    } else {
      res.json(events);
    }
  });
};

exports.createEvent = async (req, res, next) => {
  const title = req.body.title;
  const allDay = req.body.allDay;
  const startDate = req.body.start;
  const endDate = req.body.end;

  const event = new Event({
    title: title,
    allDay: allDay,
    start: new Date(startDate).toISOString(),
    end: new Date(endDate).toISOString(),
  });

  event.save((err, event) => {
    if (err) {
      console.log(err);
      res.json(`Something went Wrong...`).status(500);
    } else {
      console.log(event);
      res.status(200).json(`${JSON.stringify(event)}`);
    }
  });
};

exports.updateEvent = async (req, res, next) => {
  const eventId = req.body.eventId;
  const updatedTitle = req.body.title;
  const updatedAllDay = req.body.allDay;
  const updatedStartDate = req.body.start;
  const updatedEndDate = req.body.end;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      const error = new Error('Could not find event.');
      error.statusCode = 404;
      throw error;
    }
    event.title = updatedTitle;
    event.allDay = updatedAllDay;
    event.start = updatedStartDate;
    event.end = updatedEndDate;
    const result = await event.save();
    res.status(200).json({message: 'Event updated!', event: result});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

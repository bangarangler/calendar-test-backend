const Event = require('../models/event.js')

exports.getEvents = async (req, res, next) => {
  const events = await Event.find({}, (err, events) => {
    if (err) {
      console.log(err)
    } else {
      res.json(events)
    }
  })
}

exports.createEvent = async (req, res, next) => {
  const title = req.body.title;
  const allDay = req.body.allDay;
  const startDate = req.body.start;
  const endDate = req.body.end;

  const event = new Event({
    title: title,
    allDay: allDay,
    start: new Date(startDate).toISOString(),
    end: new Date(endDate).toISOString()
  })

  event.save((err, event) => {
    if (err) {
      console.log(err)
      res.json(`Something went Wrong...`).status(500)
    } else {
      console.log(event)
      res.status(200).json(`${event}`)
    }
  })
}

const express = require('express')
const eventController = require('../controllers/event.js');

const router = express.Router();

router.get('/events', eventController.getEvents);

router.post('/event', eventController.createEvent);

router.put('/update/:eventId', eventController.updateEvent);

router.delete('/delete/:eventId', eventController.deleteEvent);

module.exports = router;

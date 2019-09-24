const express = require('express')
const eventController = require('../controllers/event.js');

const router = express.Router();

router.get('/events', eventController.getEvents);

router.post('/event', eventController.createEvent);

module.exports = router;

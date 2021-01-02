const express = require('express');
const router = express.Router();

const eventApiController = require('../../api/EventAPI');

router.get('/', eventApiController.getEvents);
router.get('/:eventId', eventApiController.getEventById);
router.post('/', eventApiController.createEvent);
router.put('/:eventId', eventApiController.updateEvent);
router.delete('/:eventId', eventApiController.deleteEvent);

module.exports = router;
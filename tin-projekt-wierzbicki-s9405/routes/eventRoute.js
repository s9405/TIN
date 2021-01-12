const express = require('express');
const router = express.Router();
const eventControler = require('../controllers/eventController');
const authUtils = require('../util/authUtils');

router.get('/', eventControler.showEventList);
router.get('/add', authUtils.permitAuthenticatedUser, eventControler.showAddEventForm);
router.get('/edit/:eventId', authUtils.permitAuthenticatedUser, eventControler.showEditEventForm);
router.get('/details/:eventId', authUtils.permitAuthenticatedUser, eventControler.showEventDetails);
router.post('/add', authUtils.permitAuthenticatedUser, eventControler.addEvent);
router.post('/edit', authUtils.permitAuthenticatedUser, eventControler.updateEvent);
router.get('/delete/:eventId',authUtils.permitAuthenticatedUser, eventControler.deleteEvent);
module.exports = router;
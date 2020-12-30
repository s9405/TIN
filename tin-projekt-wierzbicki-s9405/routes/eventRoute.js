const express = require('express');
const router = express.Router();
const eventControler = require('../controllers/eventController');
router.get('/', eventControler.showEvent);
router.get('/add', eventControler.showAddEventForm);
router.get('/details', eventControler.showEventDetails);//router.get('/details/:playerId', playerControler.showPlayerDetails);
module.exports = router;
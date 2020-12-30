const express = require('express');
const router = express.Router();
const playerControler = require('../controllers/playerController');
router.get('/', playerControler.showPlayerList);
router.get('/add', playerControler.showAddPlayerForm);
router.get('/details', playerControler.showPlayerDetails);//router.get('/details/:playerId', playerControler.showPlayerDetails);
module.exports = router;
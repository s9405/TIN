const express = require('express');
const router = express.Router();
const playerControler = require('../controllers/playerController');

router.get('/', playerControler.showPlayerList);
router.get('/add', playerControler.showAddPlayerForm);
router.get('/edit/:playerId', playerControler.showEditPlayerForm);
router.get('/details/:playerId', playerControler.showPlayerDetails);
router.post('/add', playerControler.addPlayer);
router.post('/edit', playerControler.updatePlayer);
router.get('/delete/:playerId', playerControler.deletePlayer);
module.exports = router;
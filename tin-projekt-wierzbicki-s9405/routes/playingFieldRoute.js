const express = require('express');
const router = express.Router();
const playingFieldControler = require('../controllers/playingFieldController');
router.get('/', playingFieldControler.showPlayingFieldList);
router.get('/add', playingFieldControler.showAddPlayingFieldForm);
router.get('/details', playingFieldControler.showPlayingFieldDetails);//router.get('/details/:playerId', playerControler.showPlayerDetails);
module.exports = router;
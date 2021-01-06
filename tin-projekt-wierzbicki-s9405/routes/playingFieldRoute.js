const express = require('express');
const router = express.Router();
const playingFieldControler = require('../controllers/playingFieldController');
router.get('/', playingFieldControler.showPlayingFieldList);
router.get('/add', playingFieldControler.showAddPlayingFieldForm);
router.get('/edit/:pfId', playingFieldControler.showEditPlayingFieldForm)
router.get('/details/:pfId', playingFieldControler.showPlayingFieldDetails);
router.post('/add', playingFieldControler.addPlayingField);
router.post('/edit', playingFieldControler.updatePlayingField);
router.get('/delete/:pfId', playingFieldControler.deletePlayingField);
module.exports = router;
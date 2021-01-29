const express = require('express');
const router = express.Router();
const playingFieldControler = require('../controllers/playingFieldController');
const authUtils = require('../util/authUtils');

router.get('/', playingFieldControler.showPlayingFieldList);
router.get('/add', authUtils.permitAuthenticatedUser, playingFieldControler.showAddPlayingFieldForm);
router.get('/edit/:pfId', authUtils.permitAuthenticatedUser, playingFieldControler.showEditPlayingFieldForm)
router.get('/details/:pfId', authUtils.permitAuthenticatedUser, playingFieldControler.showPlayingFieldDetails);
router.post('/add', authUtils.permitAuthenticatedUser, playingFieldControler.addPlayingField);
router.post('/edit', authUtils.permitAuthenticatedUser, playingFieldControler.updatePlayingField);
router.get('/delete/:pfId', authUtils.permitAuthenticatedUser, playingFieldControler.deletePlayingField);
module.exports = router;
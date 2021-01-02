const express = require('express');
const router = express.Router();

const playingFieldApiController = require('../../api/PlayingFieldAPI');

router.get('/', playingFieldApiController.getPlayingField);
router.get('/:playingFieldId', playingFieldApiController.getPlayingFieldById);
router.post('/', playingFieldApiController.createPlayingField);
router.put('/:playingFieldId', playingFieldApiController.updatePlayingField);
router.delete('/:playingFieldId', playingFieldApiController.deletePlayingField);

module.exports = router;
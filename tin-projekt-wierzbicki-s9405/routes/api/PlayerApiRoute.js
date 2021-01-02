const express = require('express');
const router = express.Router();

const playerApiController = require('../../api/PlayerAPI');

router.get('/', playerApiController.getPlayers);
router.get('/:playerId', playerApiController.getPlayerById);
router.post('/', playerApiController.createPlayer);
router.put('/:playerId', playerApiController.updatePlayer);
router.delete('/:playerId', playerApiController.deletePlayer);

module.exports = router;
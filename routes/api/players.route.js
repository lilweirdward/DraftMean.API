var express = require('express');
var router = express.Router();

var PlayerController = require('../../controllers/player.controller');

router.get('/:boardId', PlayerController.getPlayers);
router.post('/', PlayerController.addPlayer);
router.put('/', PlayerController.updatePlayer);
router.delete('/', PlayerController.deletePlayer);

module.exports = router;
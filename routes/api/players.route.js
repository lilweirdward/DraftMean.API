var express = require('express');
var router = express.Router();

var PlayerController = require('../../controllers/player.controller');

router.get('/', PlayerController.getPlayers);
// router.put('/', PlayerController.updatePlayer);

module.exports = router;
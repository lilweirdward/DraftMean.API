var express = require('express');

var router = express.Router();
var players = require('./api/players.route');
var boards = require('./api/board.route');

router.use('/players', players);
router.use('/boards', boards);

module.exports = router;
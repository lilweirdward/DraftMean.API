var express = require('express');

var router = express.Router();
var players = require('./api/players.route');

router.use('/players', players);

module.exports = router;
var express = require('express');
var router = express.Router();

var BoardController = require('../../controllers/board.controller');

router.get('/:id', BoardController.getBoard);
router.post('/', BoardController.createBoard);
router.put('/', BoardController.updateBoard);

module.exports = router;
var BoardService = require('../services/board.service');

exports.getBoard = async function(req, res, next) {
    var id = req.query.id;

    if (id) {
        try {
            var board = await BoardService.getBoard(id);
            return res.status(200).json({
                status: 200,
                data: board,
                message: 'Board successfully retrieved'
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: 'Board could not be retrieved by ID ' + id + '. Exception: ' + e
            });
        }
    } else {
        return res.status(400).json({
            status: 400,
            message: 'Please provide an ID in the request parameter.'
        });
    }
}

exports.createBoard = async function(req, res, next) {
    console.log('in board.controller createBoard');
    // console.log('board.controller createBoard.req: ' + req.body);
    var board = {
        name: req.body.name,
        teams: req.body.teams
    }

    console.log('board.controller createBoard.board: ' + board);

    try {
        var createdBoard = await BoardService.createBoard(board);
        return res.status(200).json({
            status: 200,
            data: createdBoard,
            message: 'Board successfully created'
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: 'Board could not be created. Exception: ' + e
        });
    }
}

exports.updateBoard = async function(req, res, next) {
    if (req.body.id || req.body._id) {
        var id = req.body.id ? req.body.id : req.body._id;

        var board = {
            id,
            name: req.body.name ? req.body.name : null,
            teams: req.body.teams ? req.body.teams : null
        }

        try {
            var updatedBoard = await BoardService.updateBoard(board);
            return res.status(200).json({
                status: 200,
                data: updatedBoard,
                message: 'Board successfully updated'
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: 'Board could not be updated. Exception: ' + e
            });
        }
    } else {
        return res.status(400).json({
            status: 400,
            message: 'Request object must include an id or _id key'
        });
    }
}

// {
// 	"body": {
// 		"name": "OFFFFL Draft Board",
// 		"teams": [
// 			{ id: 1, name: "Seth Payne" }, 
// 			{ id: 2, name: "Chris Collier" }, 
// 			{ id: 3, name: "Andy Woodward" }, 
// 			{ id: 4, name: "Curt Collier" }, 
// 			{ id: 5, name: "Steve Sweeden" }, 
// 			{ id: 6, name: "Zach Woodward" }, 
// 			{ id: 7, name: "Danielle Woodward" }
// 		]
// 	}
// }
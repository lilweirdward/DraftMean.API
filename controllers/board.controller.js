var BoardService = require('../services/board.service');

exports.getBoard = async function(req, res, next) {
    var id = decodeURIComponent(req.params.id);

    if (id) {
        try {
            var hexId = Buffer.from(id, 'base64').toString('hex');

            var board = await BoardService.getBoard(hexId);
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

exports.getAllBoards = async function(req, res, next) {
    try {
        var allBoards = await BoardService.getAllBoards();
        return res.status(200).json({
            status: 200,
            data: allBoards,
            message: 'All boards successfully retrieved'
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: 'All boards were not retrieved. Exception: ' + e
        });
    }
}

exports.createBoard = async function(req, res, next) {
    console.log('in board.controller createBoard');
    // console.log('board.controller createBoard.req: ' + req.body);
    var board = {
        name: req.body.name,
        totalRounds: req.body.totalRounds,
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
    var id = req.body.id;

    if (id) {
        var hexId = Buffer.from(id, 'base64').toString('hex');

        var board = {
            id: hexId,
            name: req.body.name ? req.body.name : null,
            totalRounds: req.body.totalRounds ? req.body.totalRounds : null,
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
            message: 'Request object must include an id key'
        });
    }
}

// { "id": "WpdhWLG63j1OJmS3", "name": "OFFFFL Draft Board", "teams": [ { "id": 1, "name": "Seth Payne" }, { "id": 2, "name": "Chris Collier" }, { "id": 3, "name": "Andy Woodward" }, { "id": 4, "name": "Curt Collier" }, { "id": 5, "name": "Steve Sweeden" }, { "id": 6, "name": "Zach Woodward" }, { "id": 7, "name": "Danielle Woodward" }, { "id": 8, "name": "Nate Payne" }, { "id": 9, "name": "Heather Payne" }, { "id": 10, "name": "Robin Collier" }, { "id": 11, "name": "Michael Woodward" }, { "id": 12, "name": "Brian Payne" } ] }
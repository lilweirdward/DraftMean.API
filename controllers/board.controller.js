var BoardService = require('../services/board.service');

exports.getBoard = async function(req, res, next) {
    var id = req.query.id;

    if (id) {
        try {
            var board = BoardService.getBoard(id);
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
    var board = {
        name: req.body.name,
        teams: req.body.teams
    }

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
var Board = require('../models/board.model');

exports.getBoard = async function(id) {
    try {
        return Board.findById(id);
    } catch (e) {
        throw Error('Error while finding Board: ' + e);
    }
}

exports.createBoard = async function(board) {
    var newBoard = new Board({
        name: board.name,
        dateCreated: new Date(),
        teams: board.teams
    });

    try {
        var savedBoard = newBoard.save();
        return savedBoard;
    } catch (e) {
        throw Error('Error while creating board: ' + e);
    }
}

exports.updateBoard = async function(board) {
    var id = board.id;

    var oldBoard;
    try {
        oldBoard = await Board.findById(id);
    } catch (e) {
        throw Error('Error while finding board to update: ' + e);
    }

    if (oldBoard) {
        console.log(oldBoard);

        oldBoard.name = board.name;
        // oldBoard.dateCreated = board.dateCreated;
        for (var i = 0; i < board.teams.length(); i++) {
            oldBoard.teams[i] = board.teams[i];
        }

        console.log(oldBoard);

        try {
            var savedBoard = await oldBoard.save();
            return savedBoard;
        } catch (e) {
            throw Error('Error updating board: ' + e);
        }
    }

    return false;
}
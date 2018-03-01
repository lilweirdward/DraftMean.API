var Board = require('../models/board.model');

exports.getBoard = async function(id) {
    try {
        var board = await Board.findById(id);
        return board;
    } catch (e) {
        throw Error('Error while finding Board: ' + e);
    }
}

exports.createBoard = async function(board) {
    console.log('board.service createBoard.board: ' + board);
    var newBoard = new Board({
        name: board.name,
        dateCreated: new Date(),
        teams: board.teams
    });

    console.log('board.service createBoard.newBoard: ' + newBoard);

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
        oldBoard.teams = board.teams;

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
var Board = require('../models/board.model');
getMasterList = require('./masterPlayerList.service').getMasterList;
addPlayer = require('./player.service').addPlayer;

exports.getBoard = async function(id) {
    try {
        var board = await Board.findById(id);
        return board;
    } catch (e) {
        throw Error('Error while finding Board: ' + e);
    }
}

exports.getAllBoards = async function() {
    try {
        var allBoards = await Board.find({});
        return allBoards;
    } catch (e) {
        throw Error('Error while fetching all Boards: ' + e);
    }
}

exports.createBoard = async function(board) {
    console.log('board.service createBoard.board: ' + board);
    var newBoard = new Board({
        name: board.name,
        dateCreated: new Date(),
        totalRounds: board.totalRounds,
        teams: board.teams
    });

    console.log('board.service createBoard.newBoard: ' + newBoard);

    try {
        var savedBoard = await newBoard.save();
        var masterPlayerList = await getMasterList();

        masterPlayerList.forEach(player => {
            newPlayer = {
                Rank: player.Rank,
                PlayerName: player.PlayerName,
                Team: player.Team,
                Position: player.Position,
                ByeWeek: player.ByeWeek,
                BestRank: player.BestRank,
                WorstRank: player.WorstRank,
                AvgRank: player.AvgRank,
                StdDev: player.StdDev,
                ADP: player.ADP,
                // IsDrafted: player.IsDrafted,
                PickTaken: "",
                BoardId: savedBoard.id
            }
            
            addPlayer(newPlayer);
        });

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
        oldBoard.totalRounds = board.totalRounds;
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
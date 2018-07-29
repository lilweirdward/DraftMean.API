var PlayerService = require('../services/player.service');

_this = this;

exports.getPlayers = async function(req, res, next) {
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? Number(req.query.limit) : 30;

    var boardId = req.params.boardId;

    if (boardId) {
        try {
            var players = await PlayerService.getPlayers({ "BoardId": boardId }, page, limit);
            return res.status(200).json({
                status: 200,
                data: players,
                message: "Successfully received players"
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: e.message
            });
        }
    } else {
        return res.status(400).json({
            status: 400,
            message: 'Please provide a Board ID in the request parameter.'
        });
    }
}

exports.draftPlayer = async function(io, Player) {
    var result;
    
    if (!Player.Rank) {
        result = {
            'success': false,
            'message': 'Update failed',
            'error': 'ID/Rank must be present'
        };
        io.emit('PlayerUpdated', result);
    }

    var id = Player.Rank;
    console.log(Player);

    try {
        var updatedPlayer = await PlayerService.draftPlayer(Player);
        result = {
            'success': true,
            'message': 'Successfully updated player',
            'updatedPlayer': updatedPlayer
        };
        io.emit('PlayerUpdated', result);
    } catch (e) {
        result = {
            'success': false,
            'message': 'updatePlayer failed',
            'error': e
        };
        io.emit('PlayerUpdated', result);
    }
}

exports.updatePlayer = async function(req, res, next) {
    var player = {
        Rank: req.body.Rank,
        PlayerName: req.body.PlayerName,
        Team: req.body.Team,
        Position: req.body.Position,
        ByeWeek: req.body.ByeWeek,
        BestRank: req.body.BestRank,
        WorstRank: req.body.WorstRank,
        AvgRank: req.body.AvgRank,
        StdDev: req.body.StdDev,
        ADP: req.body.ADP,
        // IsDrafted: req.body.IsDrafted,
        PickTaken: req.body.PickTaken,
        BoardId: req.body.BoardId
    }

    try {
        var updatedPlayer = await PlayerService.updatePlayer(player);
        return res.status(200).json({
            status: 200,
            data: updatedPlayer,
            message: 'Successfully updated player'
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: 'Error updating player: ' + e
        });
    }
}

exports.addPlayer = async function(req, res, next) {
    var player = {
        Rank: req.body.Rank,
        PlayerName: req.body.PlayerName,
        Team: req.body.Team,
        Position: req.body.Position,
        ByeWeek: req.body.ByeWeek,
        BestRank: req.body.BestRank,
        WorstRank: req.body.WorstRank,
        AvgRank: req.body.AvgRank,
        StdDev: req.body.StdDev,
        ADP: req.body.ADP,
        // IsDrafted: req.body.IsDrafted,
        PickTaken: req.body.PickTaken,
        BoardId: req.body.BoardId
    }

    try {
        var newPlayer = await PlayerService.addPlayer(player);
        return res.status(200).json({
            status: 200,
            data: newPlayer,
            message: 'Successfully added new player'
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: 'Error adding new player: ' + e
        });
    }
}

exports.deletePlayer = async function(req, res, next) {
    var player = {
        PlayerName: decodeURIComponent(req.query.PlayerName),
        BoardId: decodeURIComponent(req.query.BoardId)
    }

    try {
        var deletedResponse = await PlayerService.deletePlayer(player);
        return res.status(200).json({
            status: 200,
            data: deletedResponse,
            message: 'Successfully deleted new player'
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: 'Error deleting player: ' + e
        });
    }
}
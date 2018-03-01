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

exports.updatePlayer = async function(io, Player) {
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
        var updatedPlayer = await PlayerService.updatePlayer(Player);
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
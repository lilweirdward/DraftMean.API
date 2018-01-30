var PlayerService = require('../services/player.service');

_this = this;

exports.getPlayers = async function(req, res, next) {
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 30;

    try {
        var players = await PlayerService.getPlayers({}, page, limit);
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
}

exports.updatePlayer = async function(io, Player) {
    var result;
    
    // if (!req.body.Rank)
    //     return res.status(400).json({
    //         status: 400,
    //         message: "ID/Rank must be present"
    //     });
    if (!Player.Rank) {
        result = {
            'success': false,
            'message': 'Update failed',
            'error': 'ID/Rank must be present'
        };
        io.emit('PlayerUpdated', result);
    }
    
    // var id = req.body.Rank;
    // console.log(req.body);

    // var player = req.body;

    var id = Player.Rank;
    console.log(Player);

    // try {
    //     var updatedPlayer = await PlayerService.updatePlayer(player);
    //     return res.status(200).json({
    //         status: 200,
    //         data: updatedPlayer,
    //         message: "Successfully updated player"
    //     });
    // } catch (e) {
    //     return res.status(400).json({
    //         status: 400,
    //         message: e.message
    //     });
    // }

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
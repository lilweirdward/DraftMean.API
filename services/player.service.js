var Player = require('../models/player.model');

_this = this;

exports.getPlayers = async function(query, page, limit) {
    var options = {
        page,
        limit
    };

    try {
        var players = await Player.paginate(query, {
            page: page,
            limit: limit,
            sort: { "Rank": 1 }
        });
        return players;
    } catch (e) {
        throw Error('Error while paginating Players');
    }
};

exports.updatePlayer = async function(player) {
    var rank = player.Rank;
    var boardId = player.BoardId;
    console.log(player);

    try {
        var oldPlayer = await Player.findOne({ "Rank": rank.toString(), "BoardId": boardId });
    } catch (e) {
        throw Error("Error occurred while finding the player");
    }

    console.log(oldPlayer);
    if (!oldPlayer)
        return false;
        
    console.log(player.PickTaken);

    oldPlayer.PickTaken = player.PickTaken;

    console.log(oldPlayer);

    try {
        var savedPlayer = await oldPlayer.save();
        return savedPlayer;
    } catch (e) {
        throw Error("Error occurred while updating the player: " + e.message);
    }
}
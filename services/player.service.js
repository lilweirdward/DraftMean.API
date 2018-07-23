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
            limit: limit//,
            // sort: { "Rank": 1 }
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

exports.addPlayer = async function(player) {
    var newPlayer = new Player({
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
        PickTaken: player.PickTaken,
        BoardId: player.BoardId
    });
    console.log('player.service addPlayer.newPlayer.Rank: ' + newPlayer.Rank);
    console.log('player.service addPlayer.newPlayer.BoardId: ' + newPlayer.BoardId);

    try {
        var savedPlayer = newPlayer.save();
        return savedPlayer;
    } catch (e) {
        throw Error('Error while adding player: ' + e);
    }
}
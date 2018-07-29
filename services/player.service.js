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

exports.draftPlayer = async function(player) {
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

exports.updatePlayer = async function(player) {
    var name = player.PlayerName;
    var boardId = player.BoardId;

    console.log('updatePlayer.NewPlayer: ' + JSON.stringify(player));

    try {
        var oldPlayer = await Player.findOne({ "PlayerName": name, "BoardId": boardId });
    } catch (e) {
        throw Error("Error occurred while finding the player");
    }

    console.log('updatePlayer.oldPlayer: ' + oldPlayer);
    if (!oldPlayer)
        return false;

    try {
        var savedPlayer;
        await Player.findOneAndUpdate(
            { BoardId: boardId, PlayerName: name },
            {
                Rank: player.Rank,
                Team: player.Team,
                Position: player.Position,
                ByeWeek: player.ByeWeek,
                BestRank: player.BestRank,
                WorstRank: player.WorstRank,
                AvgRank: player.AvgRank,
                StdDev: player.StdDev,
                ADP: player.ADP
            },
            (err, doc) => {
                if (err) {
                    throw Error("Error occurred while updating the player: " + err);
                }
                console.log('updatePlayer.findOneAndUpdate.doc: ' + doc);
                savedPlayer = doc
            }
        );
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
        console.log(savedPlayer);
        return savedPlayer;
    } catch (e) {
        throw Error('Error while adding player: ' + e);
    }
}

exports.deletePlayer = async function(player) {
    var name = player.PlayerName;
    var boardId = player.BoardId;

    console.log('player.service.deletePlayer name: ' + name + ', boardId: ' + boardId);

    try {
        var response;
        await Player.deleteOne(
            { PlayerName: name, BoardId: boardId },
            (err, res) => {
                if (err) {
                    throw Error("Error deleting player: " + err);
                }
                console.log('deletePlayer.deleteOne response: ' + JSON.stringify(res));
                response = res;
            }
        );
        return response;
    } catch (e) {
        throw Error('Error while deleting player: ' + err);
    }
}
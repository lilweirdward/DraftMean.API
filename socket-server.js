module.exports = function(server) {
    var module = {}

    var io = require('socket.io')(server);
    var PlayerController = require('./controllers/player.controller');

    io.on('connection', function(socket) {
        socket.on('updatePlayer', function(Player) {
            console.log('socketData: ' + JSON.stringify(Player));
            PlayerController.updatePlayer(io, Player);
        });
    });

    module.io = io;

    return module;
}
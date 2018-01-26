var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var PlayerSchema = new mongoose.Schema({
    _id: {
        type: Number,
        alias: 'Rank'
    },
    PlayerName: String,
    Team: String,
    Position: String,
    ByeWeek: Number,
    BestRank: Number,
    WorstRank: Number,
    AvgRank: Number,
    StdDev: Number,
    ADP: Number,
    IsDrafted: Boolean,
    PickTaken: Number
}, {
    collection: 'Player'
});

PlayerSchema.set('toJSON', {
    virtuals: true
});

PlayerSchema.plugin(mongoosePaginate);
const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
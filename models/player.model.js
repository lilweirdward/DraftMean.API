var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var PlayerSchema = new mongoose.Schema({
    Rank: Number,
    PlayerName: String,
    Team: String,
    Position: String,
    ByeWeek: Number,
    BestRank: Number,
    WorstRank: Number,
    AvgRank: Number,
    StdDev: Number,
    ADP: Number,
    // IsDrafted: Boolean,
    PickTaken: Number,
    BoardId: String
}, {
    collection: 'players'
});

PlayerSchema.set('toJSON', {
    virtuals: true
});

PlayerSchema.plugin(mongoosePaginate);
const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
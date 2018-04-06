var mongoose = require('mongoose');

var MasterPlayerListSchema = new mongoose.Schema({
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
    // IsDrafted: Boolean,
    PickTaken: Number,
}, {
    collection: 'masterPlayerList'
});

MasterPlayerListSchema.set('toJSON', {
    virtuals: true
});

const MasterPlayerList = mongoose.model('MasterPlayerList', MasterPlayerListSchema);

module.exports = MasterPlayerList;
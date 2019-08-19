import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
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
    PickTaken: Number,
    BoardId: String
}, {
    collection: 'players'
});

export default mongoose.model('Player', PlayerSchema);
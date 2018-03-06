var mongoose = require('mongoose');

var BoardSchema = new mongoose.Schema({
    name: String,
    dateCreated: Date,
    totalRounds: Number,
    teams: [
        {
            id: Number,
            name: String
        }
    ]
});

BoardSchema.virtual('id').get(function() {
    return Buffer.from(this._id.toString(), 'hex').toString('base64');
});

BoardSchema.set('toJSON', {
    virtuals: true
});

const Board = mongoose.model('board', BoardSchema);

module.exports = Board;
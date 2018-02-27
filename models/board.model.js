var mongoose = require('mongoose');

var BoardSchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId,
        alias: 'id'
    },
    name: String,
    dateCreated: Date,
    teams: [
        {
            id: Number,
            name: String
        }
    ]
});

BoardSchema.set('toJSON', {
    virtuals: true
});

const Board = mongoose.model('board', BoardSchema);

module.exports = Board;
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
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
BoardSchema.set('toJSON', { virtuals: true });

export default mongoose.model('board', BoardSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    name: {
        type: String,
        required: [true, 'ID is required'],
        unique: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    grade: {
        type: Number,
        default: 0
    }
});

const Record = mongoose.model('record', RecordSchema);

module.exports = Record;
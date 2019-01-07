const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: '',
        maxlength: 100,
        trim: true,
        unique: true
    },
    location: {
        type: String,
        required: true,
        default: '',
        maxlength: 100,
        trim: true
    },
    dateTime: {
        type: Date,
        default: Date.now
    }
});

EventSchema.plugin(uniqueValidator);
module.exports = { EventSchema };

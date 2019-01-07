var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const { ObjectID } = require("mongodb");
const validator = require('validator');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    username: {
        type: String,
        required: true,
        maxlength: 30,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    contactNumber: {
        type: String,
        required: true,
        minlength: 10
    },
    token: {
            type: String,
            required: true
    },
    events: [{
        eventid: {
            type: ObjectID,
            ref: 'Event'
        }
    }]
});

UserSchema.plugin(uniqueValidator);
module.exports = { UserSchema }
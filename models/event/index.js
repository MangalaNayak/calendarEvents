var mongoose = require("mongoose");
const { EventSchema } = require('./schema');
const _ = require('lodash');

EventSchema.methods.toJSON = function () {
    var event = this;
    var eventObject = event.toObject();

    return _.pick(eventObject, ["_id", "title", "location", "dateTime"]);
};

var Event = mongoose.model('Event', EventSchema);

module.exports = { Event };
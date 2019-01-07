const { Event } = require('../models/event/index');
const { User } = require('../models/user/index');
const _ = require('lodash');

//Create an event 
exports.create_event = function (req, res) {
    var body = _.pick(req.body, ['title', 'location', 'dateTime']);
    var token = req.header('Authorization');
    var event1 = new Event(body);

    User.findByToken(token).then((user) => {
        event1.save();
        Event.find({ title: body.title }).then((event) => {
            var event_id = { "eventid": event._id }
            user.events.push(event_id)
            user.save();
            res.status(200).send("Event created successfully");
        }).catch((err) => {
            return res.status(400).send(err);
        })
    }).catch((err) => {
        return res.status(400).send(err);
    })
}

//Updates a particular event 
exports.update_event = function (req, res) {
    var body = _.pick(req.body, ['title', 'location', 'dateTime']);
    var token = req.header('Authorization');
    var id = req.query.id;

    User.findByToken(token).then((user) => {
        if (!user)
            return res.status(400).send({ "message": "Invalid user" });
        Event.findByIdAndUpdate({ _id: id }, { $set: body }).then(() => {
            res.status(200).send({ "message": "Event is updated" })
        }).catch((err) => {
            return res.status(400).send(err);
        })
    }).catch((err) => {
        return res.status(400).send(err);
    })
}

//Delete a particular event 
exports.delete_event = function (req, res) {
    var token = req.header('Authorization');
    var id = req.query.id;

    User.findByToken(token).then((user) => {
        if (!user)
            return res.status(400).send({ "message": "Invalid user" });
        Event.findByIdAndDelete({ _id: id }).then((event) => {
            if (!event)
                return res.status(404).send("Event id: " + body.id + " is not found in database")
            var index = user.events.indexOf(id);
            user.events.splice(index, 1);
            event.save();
            user.save();
            res.status(200).send({ "message": "Event is deleted" })
        }).catch((err) => {
            return res.status(400).send(err);
        })
    }).catch((err) => {
        return res.status(400).send(err);
    })
}

//Get a particular event's details
exports.event_details = function (req, res) {
    var id = req.query.id;

    Event.findById(id).then((event) => {
        if (!event)
            return res.status(404).send("Event id: " + id + " is not found in database")
        else return res.status(200).send(event);
    }).catch((err) => {
        return res.status(400).send(err);
    })
}

//Get details of all events in the range of dates specified
exports.events_details = function (req, res) {
    var date1 = req.query.date1;
    var date2 = req.query.date2;

    Event.find({ dateTime: { $gte: date1, $lte: date2 } }).then((event) => {
        if (!event)
            return res.status(404).send({ "message": "No events are present in the mentioned date range" })
        res.status(200).send(event);
    }).catch((err) => {
        return res.status(400).send(err);
    })
}


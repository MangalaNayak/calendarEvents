const { User } = require('../models/user/index');
const _ = require('lodash');

//Register
exports.user_register = function (req, res) {
    var body = _.pick(req.body, ['email', 'username', 'contactNumber', 'password']);
    var confirmPassword = _.pick(req.body, ['confirm']);

    User.findOne({ email: body.email }).then((user) => {
        if (user) {
            res.status(400).send({ "message": "User with that emailid already exists" })
        }
    }).catch((err) => {
        return res.status(400).send(err);
    });
    if (confirmPassword.confirm !== body.password) {
        res.status(400).send({ "message": "password and confirmpassword don't match" })
    }
    else {
        var user = new User(body);
        user.generateAuthToken().then((token) => {
            user.token = token;
            res.status(200).send(user);
        }).catch((err) => {
            return res.status(400).send(err);
        });
    }
}

//Login
exports.user_login = function (req, res) {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            user.token = token;
            user.save();
            res.send(user);
        });
    }).catch((err) => {
        return res.status(400).send(err);
    });
}

//Logout
exports.user_logout = function (req, res) {
    var token = req.header('Authorization');

    if (!token)
        res.status(401).send();
    User.findOneAndUpdate({ token }, { $set: { token: "" } }).then((user) => {
        if (!user)
            res.status(404).send("No such user exists.");
        res.send({ "message": "Logged out" })
    }).catch((err) => {
        return res.status(400).send(err);
    });
}

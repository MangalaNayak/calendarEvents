const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const event = require('./routes/event.js')
const user = require('./routes/user.js')

mongoose.promise = global.promise;
mongoose.connect('mongodb://localhost:27017/Calendar', { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use('/events', event);
app.use('/users', user);

let port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port number : ${port}`);
});

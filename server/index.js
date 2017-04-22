const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
var exec = require('child_process').exec;

const app = express();

mongoose.connect('mongodb://localhost/records');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use(cors());

app.use('/api', require('./routes/api'));

app.use(function(err, req, res, next) {
    res.status(400).send({error: err.message})
})

app.listen(4000, function() {
    console.log("Listening for connection");
});

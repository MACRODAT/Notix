"use strict";
var mongoose = require('mongoose');
var config = require('./index');
var db = mongoose.connect(config.mongo_uri, { useNewUrlParser: true })
    .then(function () {
    return console.log('Connected to database.');
})
    .catch(function (err) { return console.log('Error', err); });
module.exports = db;

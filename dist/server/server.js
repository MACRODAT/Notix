"use strict";
var express = require('express');
var app = express();
var config = require('./config');
var db = require('./config/database');
var userRouter = require('./routes/user');
var todoRouter = require('./routes/todo');
var cors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
};
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use('/user', userRouter);
app.use('/todo', todoRouter);
app.listen(config.port, console.log('Server has started on http://localhost:%s', config.port));

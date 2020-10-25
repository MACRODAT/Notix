"use strict";
var mongoose = require('mongoose');
var model = require('./model');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var state = require('../../state/state');
module.exports = {
    save: function (req, res) {
        // save the TODO into db
        var newTODO = new model.todoModel({
            title: req.body.title,
            content: req.body.content,
            priority: req.body.priority || model.TODOPRIORITY.CASUAL,
            status: req.body.status || model.TODOSTATUS.ACTIVE,
        });
        console.log(newTODO);
        newTODO.save().then(function (result) {
            res.status(200).send({ msg: 'todo registered' });
        }).catch(function (err) {
            res.status(500).send(err);
        });
        // res.status(500).send("unknown error")
        return;
    },
    getAll: function (req, res) {
        model.todoModel.find({}, function (err, items) {
            if (err) {
                res.status(500).send({ todos: null });
                return;
            }
            res.status(200).send({ todos: items });
            return;
        });
    },
};

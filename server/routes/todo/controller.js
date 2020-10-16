var mongoose = require('mongoose');
var model = require('./model');

const jwt = require('jsonwebtoken');
const config = require('../../config');
const state = require('../../state/state');

module.exports = {
    save : (req, res) => {
        // save the TODO into db
        let newTODO = new model.todoModel ({
            title : req.body.title,
            content : req.body.content,
            priority : req.body.priority || model.TODOPRIORITY.CASUAL,
            status : req.body.status ||  model.TODOSTATUS.ACTIVE,
        });
        console.log(newTODO);

        newTODO.save().then(result => {
            res.status(200).send({msg : 'todo registered'});
                            
        }).catch(err => {
            res.status(500).send(err)
        });
        
        // res.status(500).send("unknown error")
        return;
    },

    getAll : (req, res) => {
        model.todoModel.find({} , (err, items) => {
            if (err) {
                res.status(500).send({todos : null});
                return;
            }

            res.status(200).send({todos : items});
            return;
        });
    },
}
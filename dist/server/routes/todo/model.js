"use strict";
var _this = this;
var mongoose = require('mongoose');
var TODOPRIORITY = {
    URGENT: 1,
    CASUAL: 2,
    ALL: 3,
};
var TODOSTATUS = {
    DONE: 1,
    REPORTED: 2,
    CANCELLED: 3,
    ACTIVE: 4,
    ANY: 5,
};
var todoSchema = mongoose.Schema({
    // _id : getSequenceNextValue("itemId"),
    // id : {
    //     type : Number,
    //     required : false,
    //     unique : true,
    //     index : true,
    // },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    priority: {
        type: TODOPRIORITY,
        required: false,
        default: TODOPRIORITY.CASUAL,
    },
    status: {
        type: TODOSTATUS,
        required: false,
        default: TODOSTATUS.ACTIVE,
    }
});
todoSchema.pre('save', function (next) {
    console.log(_this);
    next();
});
var todoModel = mongoose.model('todo', todoSchema);
module.exports = { todoModel: todoModel, TODOPRIORITY: TODOPRIORITY, TODOSTATUS: TODOSTATUS };

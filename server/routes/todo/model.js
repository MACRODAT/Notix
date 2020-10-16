var mongoose = require('mongoose');


const TODOPRIORITY = {
    URGENT : 1,
    CASUAL : 2,
    ALL : 3,
};

const TODOSTATUS = {
    DONE : 1,
    REPORTED : 2,
    CANCELLED : 3,
    ACTIVE : 4,
    ANY : 5,
};

const todoSchema = mongoose.Schema({
    // _id : getSequenceNextValue("itemId"),
    // id : {
    //     type : Number,
    //     required : false,
    //     unique : true,
    //     index : true,
    // },
    title : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
    },
    priority : {
        type : TODOPRIORITY,
        required : false,
        default : TODOPRIORITY.CASUAL,
    },
    status : {
        type : TODOSTATUS,
        required : false,
        default : TODOSTATUS.ACTIVE,
    }
});

todoSchema.pre('save', (next) => {
    console.log(this);
    next();
});

const todoModel = mongoose.model('todo', todoSchema);

module.exports = { todoModel : todoModel, TODOPRIORITY, TODOSTATUS};
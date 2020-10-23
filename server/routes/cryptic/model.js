// * create a model for the document, certificate, note...

const mongoose = require('mongoose');

const msgSchema = mongoose.Schema({
    sender : {
        type :  mongoose.Schema.Types.ObjectId,
        required : true,
    },
    contents : {
        type : String,
        required : true,
    },
    publicationDate : {
        type : String,
        default : Date.now().toString(),
    },
});

const blockSchema = mongoose.Schema({
    prevBlockHash : {
        type : String,
        required : true,
    },
    data : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : msgSchema,
    }],
    endingNotes : {
        type : String,
        required : true,
    }
})

const msgModel = mongoose.model('msg', msgSchema);
const blockModel = mongoose.model('block', blockSchema);

module.exports = { 
    msgModel, // the default chat / tweet message format
    blockModel,
}
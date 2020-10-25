"use strict";
// * create a model for the document, certificate, note...
var mongoose = require('mongoose');
var msgSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    contents: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: String,
        default: Date.now().toString(),
    },
});
var blockSchema = mongoose.Schema({
    prevBlockHash: {
        type: String,
        required: true,
    },
    data: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: msgSchema,
        }],
    endingNotes: {
        type: String,
        required: true,
    }
});
var msgModel = mongoose.model('msg', msgSchema);
var blockModel = mongoose.model('block', blockSchema);
module.exports = {
    msgModel: msgModel,
    blockModel: blockModel,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var sessionReducer_1 = __importDefault(require("./reducers/sessionReducer"));
var apiMiddleware_1 = __importDefault(require("./reducers/apiMiddleware"));
// applyMiddleware(forbiddenWordsMiddleware, APIInsertion),
var store = redux_1.createStore(sessionReducer_1.default, redux_1.applyMiddleware(apiMiddleware_1.default));
// store.dispatch({type :});
exports.default = store;

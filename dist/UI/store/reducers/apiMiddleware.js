"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ActionTypes = __importStar(require("../Actions/actionTypes"));
var axios_1 = __importDefault(require("axios"));
var globals_1 = __importDefault(require("../../helpers/globals"));
function APIMiddleware(_a) {
    var getState = _a.getState, dispatch = _a.dispatch;
    return function (next) {
        return function (action) {
            console.log(action);
            if (action.type === ActionTypes.LOGOUT) {
                // request logout from backend
                var HEADERS = {
                    'Content-Type': 'application/json'
                };
                axios_1.default.post(globals_1.default.baseURL + '/' + globals_1.default.userURL + '/logout').then(function (res) {
                    // console.log(res.data);
                    action.succes = true;
                    // redirect to register successful page
                    var nextAction = next(action);
                    //read next state
                    var state = getState();
                    // return the next action
                    return nextAction;
                });
            }
            if (action.type === ActionTypes.SET_LOGIN) {
                // some checks TODO
                var HEADERS = {
                    'Content-Type': 'application/json'
                };
                var user_1 = {
                    userID: action.payload.id,
                    name: action.payload.name,
                    password: action.payload.password,
                };
                axios_1.default.post(globals_1.default.baseURL + '/' + globals_1.default.userURL + '/login', user_1).then(function (res) {
                    // console.log(res.data);
                    if (res.status == 200) {
                        action.data = {
                            user: user_1,
                        };
                        // redirect to register successful page
                        var nextAction = next(action);
                        //read next state
                        var state = getState();
                        // return the next action
                        return nextAction;
                    }
                    if (res.status == 430) {
                        // redirect to register successfull page
                        action.data = {
                            user: null,
                        };
                        // redirect to register successful page
                        var nextAction = next(action);
                        //read next state
                        var state = getState();
                        // return the next action
                        return nextAction;
                    }
                }).catch(function (error) {
                    // redirect to register successfull page
                    console.log(error);
                    action.data = {
                        user: null,
                    };
                    // redirect to register successful page
                    var nextAction = next(action);
                    //read next state
                    var state = getState();
                    // return the next action
                    return nextAction;
                });
            }
        };
    };
}
exports.default = APIMiddleware;

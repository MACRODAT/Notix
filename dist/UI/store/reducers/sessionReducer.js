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
var localStorage_1 = __importDefault(require("../../storage/localStorage"));
var initState = {
    user: new localStorage_1.default(),
};
function sessionReducer(state, action) {
    if (state === void 0) { state = initState; }
    if (action.type === ActionTypes.SET_LOGIN) {
        if (action.data.user !== null) {
            // successful login from middleware,
            // engage in session creation
            var ses = new localStorage_1.default();
            ses.login(action.data.user.userID, action.data.user.name, action.data.user.password);
            return Object.assign({}, state, {
                user: ses,
            });
        }
        else {
            // no login ?? let's tell the user !
            var noLogSession = (new localStorage_1.default());
            noLogSession.genNoLoginData();
            console.log(noLogSession);
            return Object.assign({}, state, { user: noLogSession, });
        }
    }
    if (action.type === ActionTypes.LOGOUT) {
        var noLogSession = (new localStorage_1.default());
        noLogSession.genNoLoginData();
        state.user.signOut();
        return Object.assign({}, state, { user: noLogSession, });
    }
    return state;
}
exports.default = sessionReducer;

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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var actionCreator_1 = require("./store/Actions/actionCreator");
var react_redux_1 = require("react-redux");
var mapStateToProps = function (state) {
    return {};
};
var mapDispatchToProps = function (dispatch) { return ({
    logout: function () { return dispatch(actionCreator_1.logout()); }
}); };
var Signout = function (_a) {
    var logout = _a.logout;
    // sign out of form
    var _b = react_1.useState(''), goto = _b[0], setGoto = _b[1];
    logout();
    setTimeout(function () {
        setGoto('/');
    }, 1500);
    if (goto === '')
        return (react_1.default.createElement("h1", null, "SIGN OUT IN PROGRESS..."));
    else
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: "/" });
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Signout);

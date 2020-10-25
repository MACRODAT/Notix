"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDispatchToProps = exports.mapStateToProps = void 0;
var actionTypes_1 = require("./UI/store/Actions/actionTypes");
var mapStateToProps = function (state) {
    return {
        loggedIn: state.user.isLoggedInFunc(),
    };
};
exports.mapStateToProps = mapStateToProps;
var mapDispatchToProps = function (dispatch) { return ({
    logout: function () { return dispatch(actionTypes_1.LOGOUT); },
}); };
exports.mapDispatchToProps = mapDispatchToProps;

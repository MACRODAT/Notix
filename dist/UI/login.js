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
var reactstrap_1 = require("reactstrap");
require("./styles/forms.css");
var actionCreator_1 = require("./store/Actions/actionCreator");
var react_redux_1 = require("react-redux");
var mapStateToProps = function (state) {
    return {
        session: state.user
    };
};
var mapDispatchToProps = function (dispatch) { return ({
    meSetLogin: function (user) { return dispatch(actionCreator_1.setLogin(user.userID, user.name, user.password)); }
}); };
var Login = function (_a) {
    var session = _a.session, meSetLogin = _a.meSetLogin;
    var _b = react_1.useState(''), identifier = _b[0], setIdentifier = _b[1];
    var _c = react_1.useState(''), password = _c[0], setPassword = _c[1];
    var _d = react_1.useState(''), erro = _d[0], setErro = _d[1];
    console.log(session.user.name);
    var _e = react_1.useState(''), redirect = _e[0], setRedirect = _e[1];
    var redStyle = {
        'color': 'red'
    };
    react_1.useEffect(function () {
        return function () {
            setErro(session.user.name === 'loginError' ? ('Login error.') : (''));
        };
    }, [identifier]);
    react_1.useEffect(function () {
        return function () {
            // alert('');
        };
    }, [password]);
    var sendData = function () {
        var user_ = {
            userID: '',
            name: identifier,
            password: password,
        };
        // verify login
        meSetLogin(user_);
    };
    if (redirect !== '') {
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: redirect });
    }
    if (session !== null && session.isLoggedIn) {
        // redirect home ! we are signed in
        setRedirect('/');
    }
    return (react_1.default.createElement("div", { className: "keepSmall" },
        react_1.default.createElement(reactstrap_1.Form, null,
            react_1.default.createElement(reactstrap_1.FormGroup, { row: true },
                react_1.default.createElement(reactstrap_1.Label, { size: "lg", xs: 12, sm: 4, for: "ide" },
                    react_1.default.createElement("b", null, "Identifier")),
                react_1.default.createElement(reactstrap_1.Col, null,
                    react_1.default.createElement(reactstrap_1.Input, { xs: 12, sm: 8, bsSize: "lg", type: "text", name: "ide", id: "ide", placeholder: "ID", value: identifier.toString(), onChange: function (e) { return setIdentifier(e.target.value); } }))),
            react_1.default.createElement(reactstrap_1.FormGroup, { row: true, hidden: identifier.length < 3 },
                react_1.default.createElement(reactstrap_1.Label, { size: "lg", sm: 4, for: "password" }, "Pass Phrase"),
                react_1.default.createElement(reactstrap_1.Col, null,
                    react_1.default.createElement(reactstrap_1.Input, { sm: 8, bsSize: "lg", type: "password", name: "password", id: "password", placeholder: "", value: password.toString(), onChange: function (e) { return setPassword(e.target.value); } }))),
            erro !== '' ?
                (react_1.default.createElement(reactstrap_1.FormGroup, null,
                    react_1.default.createElement(reactstrap_1.Label, { className: "error text-danger" },
                        "Error : ",
                        erro)))
                : null,
            react_1.default.createElement(react_router_dom_1.Link, { to: '/register', className: "fixed-bottom m-2 p-1" }, "No account ? Join us now."),
            " ",
            react_1.default.createElement("br", null),
            react_1.default.createElement(reactstrap_1.Button, { size: "lg", onClick: sendData, color: "primary" }, "SIGN IN")),
        react_1.default.createElement("br", null),
        react_1.default.createElement(react_router_dom_1.Link, { to: '/', className: "biggerText fixed-bottom m-2 my-5  p-1 float-right" }, "[-] Go back home.")));
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Login);

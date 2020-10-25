"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var react_1 = __importStar(require("react"));
var reactstrap_1 = require("reactstrap");
var axios_1 = __importDefault(require("axios"));
var globals_1 = __importDefault(require("./helpers/globals"));
var react_router_dom_1 = require("react-router-dom");
require("./styles/forms.css");
var Register = /** @class */ (function (_super) {
    __extends(Register, _super);
    function Register() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            identifier: String,
            password: String,
            email: String,
            goto: String,
            userNameTaken: false,
        };
        _this.redStyle = {
            'color': 'red'
        };
        return _this;
    }
    Register.prototype.componentWillMount = function () {
        this.setState({ identifier: '' });
        this.setState({ password: '' });
        this.setState({ email: '' });
        this.setState({ userNameTaken: false });
        this.setState({ goto: '' });
        this.onIDChange.bind(this);
        this.onPASSChange.bind(this);
        this.validatePass.bind(this);
        this.onEmailChange.bind(this);
    };
    Register.prototype.onIDChange = function (e) {
        var _this = this;
        var v = String("");
        v = e.target.value;
        v = v.toUpperCase();
        var user = {
            name: v
        };
        axios_1.default.post(globals_1.default.baseURL + '/' + globals_1.default.userURL + '/isUsernameTaken', user).then(function (res) {
            if (res.status == 200) {
                // redirect to register successfull page
                _this.setState({ userNameTaken: res.data.exist });
            }
        });
        this.setState({ identifier: v });
    };
    Register.prototype.onPASSChange = function (e) {
        var v = String("");
        v = e.target.value;
        v = v.toUpperCase();
        this.setState({ password: v });
    };
    Register.prototype.validatePass = function () {
        // check pass phrase 
        // 
        if (this.state.password.length < 8) {
            return {
                result: false,
                reason: 'Length must be at least 8 characters.'
            };
        }
        var spaceRegex = /\s+/;
        if (spaceRegex.test(this.state.password.toString())) {
            return {
                result: false,
                reason: 'White space and tabulations are not allowed.'
            };
        }
        var passRegex = /^(?=.*\W)(?=.*\d)[a-zA-Z\d\W]{8,}$/;
        if (!passRegex.test(this.state.password.toString())) {
            return {
                result: false,
                reason: 'There should be at least one special character.'
            };
        }
        return { result: true, reason: '' };
    };
    Register.prototype.validateEmail = function () {
        // check email
        var emailRegex = /^[a-zA-Z0-9]{3,}@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;
        if (!emailRegex.test(this.state.email.toString())) {
            return {
                result: false,
                reason: 'Invalid email. Valid format : SOMEONE@PLACE.COM'
            };
        }
        return {
            result: true,
            reason: ''
        };
    };
    Register.prototype.onEmailChange = function (e) {
        var v = String("");
        v = e.target.value;
        this.setState({ email: v });
    };
    Register.prototype.sendData = function () {
        // some checks TODO
        var _this = this;
        var HEADERS = {
            'Content-Type': 'application/json'
        };
        var user = {
            name: this.state.identifier,
            password: this.state.password,
            email: this.state.email,
            account_created: '',
            picture: '',
        };
        axios_1.default.post(globals_1.default.baseURL + '/' + globals_1.default.userURL + '/register', user).then(function (res) {
            console.log(res.status);
            if (res.status == 200) {
                // redirect to register successfull page
                _this.setState({ goto: 'registerSuccess' });
            }
        });
    };
    Register.prototype.render = function () {
        var _this = this;
        if (this.state.goto.toString() != '') {
            return react_1.default.createElement(react_router_dom_1.Redirect, { to: this.state.goto.toString() });
        }
        return (react_1.default.createElement("div", { className: "keepSmall" },
            react_1.default.createElement(reactstrap_1.Form, null,
                react_1.default.createElement(reactstrap_1.FormGroup, { row: true },
                    react_1.default.createElement(reactstrap_1.Label, { size: "lg", xs: 12, sm: 12, for: "ide" },
                        react_1.default.createElement("b", null, "Identifier")),
                    react_1.default.createElement(reactstrap_1.Col, null,
                        react_1.default.createElement(reactstrap_1.Input, { xs: 12, sm: 12, bsSize: "lg", type: "text", name: "ide", id: "ide", placeholder: "ID", value: this.state.identifier.toString(), onChange: function (e) { return _this.onIDChange(e); } })),
                    this.state.userNameTaken === true ?
                        react_1.default.createElement(reactstrap_1.Label, { style: this.redStyle, size: "lg", xs: 12, sm: 12, for: "ide" },
                            react_1.default.createElement("b", null, "Username is taken."))
                        :
                            null),
                react_1.default.createElement(reactstrap_1.FormGroup, { row: true, hidden: this.state.identifier.length < 3 || this.state.userNameTaken },
                    react_1.default.createElement(reactstrap_1.Label, { size: "lg", sm: 12, for: "password" }, "Pass Phrase"),
                    react_1.default.createElement(reactstrap_1.Col, null,
                        react_1.default.createElement(reactstrap_1.Input, { sm: 8, bsSize: "lg", type: "password", name: "password", id: "password", placeholder: "", value: this.state.password.toString(), onChange: function (e) { return _this.onPASSChange(e); } })),
                    react_1.default.createElement(reactstrap_1.Label, { style: this.redStyle, size: "lg", sm: 12, for: "" }, this.validatePass()['reason'])),
                react_1.default.createElement(reactstrap_1.FormGroup, { row: true, hidden: !this.validatePass()['result'] },
                    react_1.default.createElement(reactstrap_1.Label, { size: "lg", sm: 4, for: "email" }, "Email"),
                    react_1.default.createElement(reactstrap_1.Col, null,
                        react_1.default.createElement(reactstrap_1.Input, { sm: 8, bsSize: "lg", type: "text", name: "email", id: "email", placeholder: "@E", value: this.state.email.toString(), onChange: function (e) { return _this.onEmailChange(e); } })),
                    react_1.default.createElement(reactstrap_1.Label, { style: this.redStyle, size: "lg", sm: 12, for: "" }, this.validateEmail()['reason'])),
                react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement(reactstrap_1.Button, { size: "lg", className: "col-12", onClick: this.sendData.bind(this), hidden: !this.validateEmail()['result'], color: "primary" }, "Register")),
                react_1.default.createElement("div", { className: "row fixed-bottom w-50 m-auto align-center" },
                    react_1.default.createElement("hr", { className: "row col-12 bg-secondary" }),
                    react_1.default.createElement("div", { className: "row" },
                        react_1.default.createElement(reactstrap_1.Label, { className: "col-12 text-secondary text-center" },
                            "By clicking on \"Register\", you acknowledge having read and accepted our ",
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/terms" }, "Conditions and terms of usage.")))))));
    };
    return Register;
}(react_1.Component));
exports.default = Register;

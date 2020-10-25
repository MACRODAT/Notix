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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var routeStyler_1 = require("./routeStyler");
var NoLogin = /** @class */ (function (_super) {
    __extends(NoLogin, _super);
    function NoLogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoLogin.prototype.render = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("h1", null, "No login !"),
            react_1.default.createElement("h4", null, "Please Sign in in order to access this page.")));
    };
    return NoLogin;
}(react_1.default.Component));
function isLoggedIn() {
    return false;
}
function PrivateRoute(_a) {
    var Component = _a.component, rest = __rest(_a, ["component"]);
    return (react_1.default.createElement(react_router_dom_1.Route, __assign({}, rest, { render: function (props) { return (isLoggedIn() ?
            routeStyler_1.routeStyler({ component: Component, props: {} })
            :
                routeStyler_1.routeStyler({ component: NoLogin, props: {} })); } })));
}
exports.default = PrivateRoute;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var login_1 = __importDefault(require("./login"));
var account_1 = __importDefault(require("./account"));
var home_1 = __importDefault(require("./home"));
var routeStyler_1 = require("./helpers/routeStyler");
var privateRoute_1 = __importDefault(require("./helpers/privateRoute"));
var register_1 = __importDefault(require("./register"));
var terms_1 = __importDefault(require("./terms"));
var signout_1 = __importDefault(require("./signout"));
var registerSuccess_1 = __importDefault(require("./navs/registerSuccess"));
var Routing = function (props, state) { return (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/", render: function (props) { return routeStyler_1.routeStyler({ component: home_1.default, props: props }); } }),
    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/terms", render: function (props) { return routeStyler_1.routeStyler({ component: terms_1.default, props: props }); } }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/login", component: login_1.default }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/signout", render: function (props) { return routeStyler_1.routeStyler({ component: signout_1.default, props: props }); } }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/register", render: function (props) { return routeStyler_1.routeStyler({ component: register_1.default, props: props }); } }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/registerSuccess", render: function (props) { return routeStyler_1.routeStyler({ component: registerSuccess_1.default, props: props }); } }),
    react_1.default.createElement(privateRoute_1.default, { path: "/account", component: account_1.default }))); };
exports.default = Routing;

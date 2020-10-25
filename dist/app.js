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
var react_1 = __importDefault(require("react"));
require("./UI/styles/app.css");
var theming = __importStar(require("./UI/theming/theming"));
var navMenuNoLogin_1 = __importDefault(require("./UI/navs/navMenuNoLogin"));
var Routes_1 = __importDefault(require("./UI/Routes"));
var react_router_dom_1 = require("react-router-dom");
var historyNavigator_1 = __importDefault(require("./UI/helpers/historyNavigator"));
var mappers = __importStar(require("./loginUtils"));
var react_redux_1 = require("react-redux");
var navMenuWithLogin_1 = __importDefault(require("./UI/navs/navMenuWithLogin"));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            goto: '',
            activeTheme: '',
            switchToVerticalNav: false,
        };
        _this.props = {
            loggedIn: null,
            logout: null,
        };
        _this.goto.bind(_this);
        return _this;
    }
    App.prototype.goto = function (path) {
        this.setState({ goto: path });
    };
    App.prototype.applyTheme = function (theme) {
        if (theme === 'light') {
            theming.applyTheme(theming.lightTheme);
        }
        if (theme === 'dark') {
            theming.applyTheme(theming.darkTheme);
        }
        this.setState({ activeTheme: theme });
    };
    App.prototype.componentWillMount = function () {
        this.applyTheme('dark');
    };
    App.prototype.switchNav = function () {
        this.setState({ verticalToggle: !this.state.switchToVerticalNav });
    };
    App.prototype.render = function () {
        // 
        var _this = this;
        return (react_1.default.createElement("div", { className: "content" },
            react_1.default.createElement("div", { className: "draggable" }, this.props.loggedIn ?
                react_1.default.createElement(navMenuWithLogin_1.default, { verticalToggle: function () { return _this.switchNav.bind(_this)(); }, redirecter: function (path) { return _this.goto(path); }, toggleTheme: function () { return _this.applyTheme(_this.state.activeTheme === 'dark' ? 'light' : 'dark'); } })
                :
                    react_1.default.createElement(navMenuNoLogin_1.default, { verticalToggle: function () { return _this.switchNav.bind(_this)(); }, redirecter: function (path) { return _this.goto(path); }, toggleTheme: function () { return _this.applyTheme(_this.state.activeTheme === 'dark' ? 'light' : 'dark'); } })),
            react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(Routes_1.default, null),
                react_1.default.createElement(historyNavigator_1.default, { goto: this.state.goto }))));
    };
    return App;
}(react_1.default.Component));
exports.default = react_redux_1.connect(mappers.mapStateToProps, mappers.mapDispatchToProps)(App);

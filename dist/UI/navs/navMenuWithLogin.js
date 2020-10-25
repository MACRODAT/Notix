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
exports.noWrap = void 0;
var react_1 = __importStar(require("react"));
require("bootstrap/dist/css/bootstrap.min.css");
var reactstrap_1 = require("reactstrap");
require("../styles/navMenu.css");
exports.noWrap = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: "nowrap",
};
var NavMenuWithLogin = /** @class */ (function (_super) {
    __extends(NavMenuWithLogin, _super);
    function NavMenuWithLogin() {
        // setCollapsed =  (v : boolean) => {this.collapsed = v }/
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toggleNavbar = function () {
            _this.setState({ collapsed: !_this.state.collapsed });
            _this.props.verticalToggle();
        };
        _this.menus = {
            'ACCOUNT': '/account',
            'TODO': '/todo',
            'DOCS': '/docs',
            'SIGNOUT': '/signout',
        };
        return _this;
    }
    NavMenuWithLogin.prototype.componentWillMount = function () {
        this.toggleNavbar.bind(this);
        this.setState({ redirect: '' });
        this.setState({ collapsed: true });
    };
    NavMenuWithLogin.prototype.getMenus = function () {
        var _this = this;
        return (react_1.default.createElement(react_1.Fragment, null, Object.keys(this.menus).map(function (key) {
            // iterate over menus and set up navs
            return (react_1.default.createElement(reactstrap_1.NavItem, null,
                react_1.default.createElement(reactstrap_1.NavLink, { className: "darkTheme noDrag", style: __assign({}, exports.noWrap), onClick: function () {
                        _this.toggleNavbar();
                        _this.props.redirecter(key);
                    } }, key)));
        })));
    };
    NavMenuWithLogin.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(reactstrap_1.Navbar, { color: "dark", light: true, expand: "md" },
            react_1.default.createElement(reactstrap_1.NavbarBrand, { className: "darkTheme noDrag", href: "/" }, "SERVICE"),
            react_1.default.createElement(reactstrap_1.NavbarToggler, { className: "noDrag", onClick: this.toggleNavbar }),
            react_1.default.createElement(reactstrap_1.Collapse, { className: "", isOpen: !this.state.collapsed, navbar: true },
                react_1.default.createElement(reactstrap_1.Nav, { className: "mr-auto darkTheme", navbar: true }, this.getMenus()),
                react_1.default.createElement(reactstrap_1.UncontrolledDropdown, { className: "noDrag", setActiveFromChild: true },
                    react_1.default.createElement(reactstrap_1.DropdownToggle, { tag: "a", className: "nav-link noLinkStyle", caret: true }, "Theme"),
                    react_1.default.createElement(reactstrap_1.DropdownMenu, null,
                        react_1.default.createElement(reactstrap_1.DropdownItem, { tag: "a", onClick: function () { return _this.props.toggleTheme(); }, active: true }, "Switch Theme"))),
                react_1.default.createElement(reactstrap_1.NavbarText, { style: __assign({ color: 'grey' }, exports.noWrap) }, "@2020 UND SERVICES AND TECHNOLOGIES"))));
    };
    return NavMenuWithLogin;
}(react_1.Component));
exports.default = NavMenuWithLogin;

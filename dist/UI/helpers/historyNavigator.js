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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var react_1 = __importDefault(require("react"));
var HistoryNavigator = /** @class */ (function (_super) {
    __extends(HistoryNavigator, _super);
    function HistoryNavigator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {
            goto: '',
        };
        _this.state = {
        // myUrl : '',
        };
        return _this;
    }
    HistoryNavigator.prototype.setUrl = function (newUrl) {
        history.push(newUrl.toString());
        this.setState({ urls: newUrl });
    };
    HistoryNavigator.prototype.goto = function () {
        return (react_1.default.createElement(react_router_dom_1.Redirect, { to: this.props.goto }));
    };
    HistoryNavigator.prototype.render = function () {
        if (this.props.goto != '') {
            return this.goto();
        }
        return null;
    };
    return HistoryNavigator;
}(react_1.default.Component));
var history = Array();
exports.default = HistoryNavigator;

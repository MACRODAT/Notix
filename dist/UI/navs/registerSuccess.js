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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var reactstrap_1 = require("reactstrap");
var react_router_dom_1 = require("react-router-dom");
var RegisterSuccess = /** @class */ (function (_super) {
    __extends(RegisterSuccess, _super);
    function RegisterSuccess() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            goto: String,
        };
        _this.props = {};
        return _this;
    }
    RegisterSuccess.prototype.timerDifference = function () {
        // redirect home !
        this.setState({ goto: '/' });
    };
    RegisterSuccess.prototype.componentWillMount = function () {
        setTimeout(this.timerDifference.bind(this), 1500);
        this.setState({ goto: '' });
    };
    RegisterSuccess.prototype.render = function () {
        if (this.state.goto.toString() != '') {
            return react_1.default.createElement(react_router_dom_1.Redirect, { to: this.state.goto.toString() });
        }
        return (react_1.default.createElement(reactstrap_1.Container, null,
            react_1.default.createElement(reactstrap_1.Row, null,
                react_1.default.createElement("div", { className: "display-4" }, "Database update operation successful ")),
            react_1.default.createElement("br", null),
            react_1.default.createElement(reactstrap_1.Row, null,
                react_1.default.createElement(reactstrap_1.Alert, { color: "success" },
                    react_1.default.createElement(reactstrap_1.Spinner, { color: "success" }),
                    "The requested transaction has been performed successfuly, in a few moments you will be redirected home."))));
    };
    return RegisterSuccess;
}(react_1.Component));
exports.default = RegisterSuccess;

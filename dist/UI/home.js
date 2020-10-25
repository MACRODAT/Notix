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
var client = __importStar(require("../Blockchain/client"));
var reactstrap_1 = require("reactstrap");
var electron = window.require('electron');
// const fs = electron.remote.require('fs');
var ipcRenderer = electron.ipcRenderer;
var ifot;
// ipcRenderer.invoke('getApiVersion', null);
// ipcRenderer.on('getApiVersionResponse',  (event, args) => {
//     ifot = args;
//     console.log(ifot);
// }); // 'just something');
// ipcRenderer.send('synchronous-message')
var Home = function (props, state) {
    var _a = react_1.useState(''), version = _a[0], setVersion = _a[1];
    ipcRenderer.on('getApiVersionResponse', function (event, arg) {
        setVersion(arg);
    });
    react_1.useEffect(function () {
        console.log('called');
    }, [version]);
    ipcRenderer.send('getApiVersion', 'ping');
    var data = client.getData();
    var pushTransaction = function () {
        ipcRenderer.send('pushTransaction', {
            sender: 10229,
            data: 'THIS IS SOME HASH DATA REFERRING TO ANY POSSIBLE COMBINATION OF ENTROPY.',
            signature: 'RND SIG',
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, "MUSWADA APP"),
        react_1.default.createElement("h2", null,
            "API ",
            version),
        react_1.default.createElement(reactstrap_1.Button, { onClick: pushTransaction }, "add transaction")));
};
exports.default = Home;

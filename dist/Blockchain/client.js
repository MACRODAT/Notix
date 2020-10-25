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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
var axios_1 = __importDefault(require("axios"));
var globals_1 = __importDefault(require("../UI/helpers/globals"));
var prv = __importStar(require("./apiData.ignore"));
var getData = function () {
    // fetch the data from the API
    var config = {
        headers: prv.token,
        'Content-Type': 'application/json',
    };
    console.log('sending data');
    axios_1.default.get(globals_1.default.bAPI, config).then(function (res) {
        // handle the reesponse !
        console.log(res.data);
    });
    console.log('sent data. response ....');
};
exports.getData = getData;

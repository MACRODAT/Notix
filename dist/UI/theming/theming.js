"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyTheme = exports.darkTheme = exports.lightTheme = void 0;
exports.lightTheme = {
    "--color-solid": "black",
    "--color-surface": "white",
    "--color-primary": "teal"
};
exports.darkTheme = {
    "--color-solid": "#e3e5e0",
    "--color-surface": "#342434",
    "--color-primary": "purple"
};
exports.applyTheme = function (nextTheme) {
    var theme = nextTheme;
    // console.log(theme);
    Object.keys(theme).map(function (key) {
        var value = theme[key];
        document.documentElement.style.setProperty(key, value);
    });
};

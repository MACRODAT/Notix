"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var session = /** @class */ (function () {
    function session() {
        var _this = this;
        this.isLoggedInFunc = function () {
            return _this.isLoggedIn;
        };
        this.user = {
            userID: '',
            name: '',
            password: '',
        };
        // initially, we are NOT logged IN.
        this.isLoggedIn = false;
        this.checkLS();
    }
    session.prototype.checkLS = function () {
        var _a, _b;
        var idd = localStorage.getItem('userID');
        if (idd != null) {
            var cr = String((_a = localStorage.getItem('name')) !== null && _a !== void 0 ? _a : '');
            var ex = String((_b = localStorage.getItem('password')) !== null && _b !== void 0 ? _b : '');
            if (cr !== '') {
                this.login(idd, cr, ex);
            }
            else {
                this.genNoLoginData();
            }
        }
    };
    session.prototype.signOut = function () {
        this.isLoggedIn = false;
        this.user.userID = '';
        this.user.name = '';
        this.user.password = '';
        localStorage.setItem('userID', this.user.userID.toString());
        localStorage.setItem('name', this.user.name.toString());
        localStorage.setItem('password', this.user.password.toString());
    };
    session.prototype.login = function (id, name, password) {
        this.user.userID = id;
        this.user.name = name;
        this.user.password = password;
        if (this.user.name.length > 0) {
            this.isLoggedIn = true;
        }
        console.log(this.user.userID);
        // persist ?
        if (true) // sometimes user does not wish to persist #TODO
         {
            localStorage.setItem('userID', this.user.userID.toString());
            localStorage.setItem('name', this.user.name.toString());
            localStorage.setItem('password', this.user.password.toString());
        }
    };
    session.prototype.genNoLoginData = function () {
        this.user = { userID: '', name: 'loginError', password: '' };
        this.isLoggedIn = false;
    };
    return session;
}());
exports.default = session;

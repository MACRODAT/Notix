"use strict";
var userT = function (name_, id_, exp_, token) {
    this.name = name_;
    this.id = id_;
    this.refToken = token;
    this.expirationDate = exp_;
    // console.log(this);
};
module.exports = {
    loggedUsersTable: [],
    userT: userT,
};

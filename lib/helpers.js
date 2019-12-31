"use strict";
exports.__esModule = true;
var MS_PER_DAY = 1000 * 60 * 60 * 24;
var MS_PER_HOUR = 1000 * 60 * 60;
exports.addHours = function (date, h) {
    var ret = new Date(date);
    ret.setTime(date.getTime() + (h * 60 * 60 * 1000));
    return ret;
};
exports.dateIsEarlierThan = function (a, b) { return a.valueOf() < b.valueOf(); };
exports.dateIsLaterThan = function (a, b) { return a.valueOf() > b.valueOf(); };
exports.dateIsWithinAnHour = function (a, b) { return Math.abs(a.valueOf() - b.valueOf()) < 3600000; };
exports.dateIsBetween = function (date, start, end) {
    return start.valueOf() <= date.valueOf() && end.valueOf() >= date.valueOf();
};
exports.getTime = function (date) { return date.toISOString().slice(-13, -5); };
exports.getDateTime = function (date) {
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', hour: 'numeric' });
};

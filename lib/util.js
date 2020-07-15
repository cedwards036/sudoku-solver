"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.range = range;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function range(n) {
    return [].concat(_toConsumableArray(Array(n).keys()));
}
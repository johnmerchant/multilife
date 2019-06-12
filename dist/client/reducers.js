"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var redux_websocket_1 = require("@giantmachines/redux-websocket");
var redux_1 = require("redux");
var socket = function (state, action) {
    if (state === void 0) { state = { isConnected: false }; }
    switch (action.type) {
        case redux_websocket_1.WEBSOCKET_OPEN: return __assign({ isConnected: true }, state);
        case redux_websocket_1.WEBSOCKET_BROKEN:
        case redux_websocket_1.WEBSOCKET_CLOSED:
            return __assign({ isConnected: false }, state);
        default: return __assign({}, state);
    }
};
exports.reducer = redux_1.combineReducers({ socket: socket });

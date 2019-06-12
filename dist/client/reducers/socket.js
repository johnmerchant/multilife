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
exports.WS_PREFIX = redux_websocket_1.DEFAULT_PREFIX + '::';
exports.socket = function (state, action) {
    if (state === void 0) { state = { isConnected: false }; }
    switch (action.type) {
        case exports.WS_PREFIX + redux_websocket_1.WEBSOCKET_OPEN: return __assign({}, state, { isConnected: true });
        case exports.WS_PREFIX + redux_websocket_1.WEBSOCKET_BROKEN:
        case exports.WS_PREFIX + redux_websocket_1.WEBSOCKET_CLOSED:
            return __assign({}, state, { isConnected: false });
        default: return __assign({}, state);
    }
};

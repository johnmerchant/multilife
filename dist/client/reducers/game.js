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
var models_1 = require("../../models");
var redux_websocket_1 = require("@giantmachines/redux-websocket");
var socket_1 = require("./socket");
var world_1 = require("../../common/world");
exports.initialState = {
    world: [],
    range: {
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
    }
};
exports.game = function (state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        // Receive
        case socket_1.WS_PREFIX + redux_websocket_1.WEBSOCKET_MESSAGE:
            return handleMessage(state, JSON.parse(action.payload.message));
        // Send
        case socket_1.WS_PREFIX + redux_websocket_1.WEBSOCKET_SEND:
            return handleMessage(state, action.payload);
    }
    return __assign({}, state);
};
var handleMessage = function (state, message) {
    if (models_1.isUpdate(message)) {
        return __assign({}, state, { world: message.world, range: world_1.range(message.world), lookup: world_1.createLookup(message.world) });
    }
    if (models_1.isSetCell(message)) {
        var cell = message.cell, alive = message.alive;
        var world = world_1.setCell(state.world, cell, alive);
        return __assign({}, state, { world: world, range: world_1.range(world) });
    }
    if (models_1.isSpeed(message)) {
        return __assign({}, state, { speed: message.speed });
    }
    if (models_1.isColor(message)) {
        return __assign({}, state, { color: message.color });
    }
    return __assign({}, state);
};

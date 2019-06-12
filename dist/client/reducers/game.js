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
    var message;
    switch (action.type) {
        case socket_1.WS_PREFIX + redux_websocket_1.WEBSOCKET_MESSAGE:
            message = JSON.parse(action.payload.message);
            switch (message.type) {
                case models_1.MessageType.Update:
                    var update = message;
                    return __assign({}, state, { world: update.world, range: world_1.range(update.world), lookup: world_1.createLookup(update.world) });
            }
            break;
        case socket_1.WS_PREFIX + redux_websocket_1.WEBSOCKET_SEND:
            message = action.payload;
            switch (message.type) {
                case models_1.MessageType.SetCell:
                    var _a = message, cell = _a.cell, alive = _a.alive;
                    var world = world_1.setCell(state.world, cell, alive);
                    return __assign({}, state, { world: world, range: world_1.range(world) });
            }
            break;
    }
    return __assign({}, state);
};

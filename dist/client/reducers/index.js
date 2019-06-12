"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var socket_1 = require("./socket");
var game_1 = require("./game");
;
exports.reducer = redux_1.combineReducers({
    socket: socket_1.socket,
    game: game_1.game,
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var redux_websocket_1 = require("@giantmachines/redux-websocket");
exports.setCell = function (cell, alive) { return redux_websocket_1.send({
    type: models_1.MessageType.SetCell,
    cell: cell,
    alive: alive
}); };

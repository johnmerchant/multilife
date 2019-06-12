"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var reducers_1 = require("../reducers");
var react_redux_1 = require("react-redux");
var redux_websocket_1 = __importDefault(require("@giantmachines/redux-websocket"));
var WebSocketConnection_1 = require("./WebSocketConnection");
var react_1 = __importDefault(require("react"));
var Game_1 = require("./Game");
var Speed_1 = require("./Speed");
var store = redux_1.createStore(reducers_1.reducer, redux_1.applyMiddleware(redux_websocket_1.default()));
exports.App = function () {
    return react_1.default.createElement(react_redux_1.Provider, { store: store },
        react_1.default.createElement(WebSocketConnection_1.WebSocketConnection, { url: "ws://localhost:5000/" },
            react_1.default.createElement("h1", null, "MultiLife!"),
            react_1.default.createElement(Speed_1.Speed, { min: 100, max: 500 }),
            react_1.default.createElement(Game_1.Game, { width: 800, height: 600 })));
};

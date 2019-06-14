"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var core_1 = require("@emotion/core");
var react_1 = __importDefault(require("react"));
var redux_1 = require("redux");
var reducers_1 = require("../reducers");
var react_redux_1 = require("react-redux");
var redux_websocket_1 = __importDefault(require("@giantmachines/redux-websocket"));
var WebSocketConnection_1 = require("./WebSocketConnection");
var Game_1 = require("./Game");
var Colors_1 = require("./Colors");
var styles_1 = require("../styles");
var store = redux_1.createStore(reducers_1.reducer, redux_1.applyMiddleware(redux_websocket_1.default()));
exports.App = function () { return core_1.jsx(react_1.default.Fragment, null,
    core_1.jsx(core_1.Global, { styles: styles_1.globalStyle }),
    core_1.jsx(react_redux_1.Provider, { store: store },
        core_1.jsx("h1", null, "MultiLife!"),
        core_1.jsx("p", null,
            "Constructed with curiosity by ",
            core_1.jsx("a", { href: "https://jmercha.github.io/" }, "jmercha"),
            ". \uD83E\uDD13"),
        core_1.jsx(WebSocketConnection_1.WebSocketConnection, { url: "ws://localhost:5000/" },
            core_1.jsx("main", { css: styles_1.containerStyle },
                core_1.jsx("aside", { css: styles_1.sidebarStyle },
                    core_1.jsx(Colors_1.Colors, null)),
                core_1.jsx(Game_1.Game, null))))); };

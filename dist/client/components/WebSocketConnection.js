"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_websocket_1 = require("@giantmachines/redux-websocket");
var WebSocketConnectionComponent = function (_a) {
    var url = _a.url, isConnected = _a.isConnected, connect = _a.connect, children = _a.children;
    // this ensures we are always connected, or trying to connect to the websocket endpoint!
    react_1.useEffect(function () { if (!isConnected)
        connect(url); }, [url, isConnected]);
    return react_1.default.createElement(react_1.default.Fragment, null, children);
};
/**
 * Connects the App to the WebSocket endpoint.
 */
exports.WebSocketConnection = react_redux_1.connect(function (state) { return ({ isConnected: state.socket.isConnected }); }, function (dispatch) { return ({ connect: function (url) { return dispatch(redux_websocket_1.connect(url)); } }); })(WebSocketConnectionComponent);

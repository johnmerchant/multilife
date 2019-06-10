"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(require("http"));
var ws = __importStar(require("ws"));
var express_1 = __importDefault(require("express"));
var game_events_1 = require("./game-events");
var messages_1 = require("../@types/messages");
var Server = /** @class */ (function () {
    function Server() {
        var _this = this;
        this.app = express_1.default();
        this.events = new game_events_1.GameEvents();
        this.app.use(express_1.default.static('static'));
        this.httpServer = http.createServer(this.app);
        this.wsServer = new ws.Server({ server: this.httpServer });
        this.wsServer.on('connection', function (connection) {
            connection.on('message', _this.onMessage);
            var updateHandler = function (world) {
                var update = {
                    type: messages_1.MessageType.Update,
                    world: world
                };
                connection.send(JSON.stringify(update));
            };
            _this.events.on('update', updateHandler);
            connection.on('close', function () { return _this.events.off('update', updateHandler); });
            _this.events.emit('refresh');
        });
    }
    Server.prototype.onMessage = function (data) {
        try {
            var payload = JSON.parse(String(data));
            switch (payload.type) {
                case messages_1.MessageType.PutCell:
                    var putCell = payload;
                    this.events.emit('putcell', putCell.cell);
                    break;
            }
        }
        catch (err) {
            console.error(err);
        }
    };
    Server.prototype.run = function () {
        var _this = this;
        this.httpServer.listen(5000);
        return new Promise(function (resolve) { return _this.httpServer.on('close', function () { return resolve(); }); });
    };
    return Server;
}());
exports.Server = Server;

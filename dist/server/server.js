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
var models_1 = require("../models");
var Server = /** @class */ (function () {
    function Server() {
        var _this = this;
        this._app = express_1.default();
        this._events = new game_events_1.GameEvents();
        this._app.use(express_1.default.static('static'));
        this._httpServer = http.createServer(this._app);
        this._wsServer = new ws.Server({ server: this._httpServer });
        this._wsServer.on('connection', function (connection) {
            console.debug('client connected');
            connection.on('message', function (data) { return _this.onMessage(data); });
            var updateHandler = function (world) {
                var update = {
                    type: models_1.MessageType.Update,
                    world: world
                };
                connection.send(JSON.stringify(update));
            };
            var setCellHandler = function (cell, alive) {
                var setCell = { type: models_1.MessageType.SetCell, cell: cell, alive: alive };
                connection.send(JSON.stringify(setCell));
            };
            var speedHandler = function (speed) {
                var speedMsg = { type: models_1.MessageType.Speed, speed: speed };
                connection.send(JSON.stringify(speedMsg));
            };
            _this._events.on('update', function (world) { return updateHandler(world); });
            connection.on('close', function () {
                _this._events.off('update', updateHandler);
                _this._events.off('setcell', setCellHandler);
                _this._events.off('speed', speedHandler);
            });
            _this._events.emit('refresh');
        });
    }
    Server.prototype.onMessage = function (data) {
        try {
            var payload = JSON.parse(String(data));
            switch (payload.type) {
                case models_1.MessageType.SetCell:
                    var _a = payload, cell = _a.cell, alive = _a.alive;
                    console.debug({ cell: cell, alive: alive });
                    this._events.emit('setcell', cell, alive);
                    break;
                case models_1.MessageType.Speed:
                    var speed = payload.speed;
                    console.debug('speed: ' + speed);
                    this._events.emit('speed', speed);
            }
        }
        catch (err) {
            console.error(err);
        }
    };
    Server.prototype.run = function () {
        var _this = this;
        var promise = new Promise(function (resolve) { return _this._httpServer.on('close', function () { return resolve(); }); });
        this._httpServer.listen(5000, function () { return console.log('listening on 5000'); });
        return promise;
    };
    return Server;
}());
exports.Server = Server;

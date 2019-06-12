"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("./game");
var events_1 = require("events");
/**
 * Handles changes in Game State
 */
var GameEvents = /** @class */ (function (_super) {
    __extends(GameEvents, _super);
    function GameEvents() {
        var _this = _super.call(this) || this;
        _this._game = new game_1.Game(); // current state
        _this._interval = setInterval(function () { return _this.tick(); }, 1000);
        _this.on('setcell', _this.setCell);
        _this.on('refresh', _this.refresh);
        return _this;
    }
    GameEvents.prototype.setCell = function (cell, isAlive) {
        this._game = this._game.setCell(cell, isAlive);
        this.refresh();
    };
    GameEvents.prototype.stop = function () {
        clearInterval(this._interval);
        this.emit('stop');
    };
    GameEvents.prototype.refresh = function () {
        this.emit('update', this._game.world);
    };
    GameEvents.prototype.tick = function () {
        this._game = this._game.tick();
        this.refresh();
    };
    return GameEvents;
}(events_1.EventEmitter));
exports.GameEvents = GameEvents;

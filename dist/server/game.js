"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var world_1 = require("../common/world");
/**
 * Represents an instance of Conway's Game of Life game state.
 */
var Game = /** @class */ (function () {
    /**
     * Creates an instance of the Game of Life
     * @param world A colleciton of living Cells
     */
    function Game(world) {
        this._world = world || [];
        this._lookup = world_1.createLookup(this._world);
    }
    Object.defineProperty(Game.prototype, "lookup", {
        get: function () {
            return this._lookup;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "world", {
        get: function () {
            return this._world;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.setCell = function (cell, isAlive) {
        if (this._lookup(cell.x, cell.y) === isAlive) {
            return this; // no effect on state
        }
        return new Game(world_1.setCell(this._world, cell, isAlive));
    };
    Game.prototype.range = function () {
        return world_1.range(this._world);
    };
    Game.prototype.lookupNeighbors = function (cell) {
        return world_1.lookupNeighbors(cell, this._lookup);
    };
    /**
     * Gets the next instance of the Game of Life state
     */
    Game.prototype.tick = function () {
        var _this = this;
        return new Game(__spread(world_1.cells(this._world)).map(function (cell) { return ({
            cell: cell,
            neighbors: __spread(_this.lookupNeighbors(cell)).length,
            isAlive: _this._lookup(cell.x, cell.y)
        }); })
            .filter(function (_a) {
            var neighbors = _a.neighbors, isAlive = _a.isAlive;
            if (isAlive) {
                if (underpopulated(neighbors))
                    return false;
                if (nextGeneration(neighbors))
                    return true;
                if (overpopulated(neighbors))
                    return false;
            }
            else {
                if (reproduce(neighbors))
                    return true;
            }
        })
            .map(function (_a) {
            var cell = _a.cell;
            return cell;
        }));
    };
    Game.prototype.toString = function () {
        return world_1.stringify(this._world, this._lookup);
    };
    return Game;
}());
exports.Game = Game;
var underpopulated = function (neighbors) { return neighbors < 2; };
var nextGeneration = function (neighbors) { return neighbors === 2 || neighbors === 3; };
var overpopulated = function (neighbors) { return neighbors > 2; };
var reproduce = function (neighbors) { return neighbors === 3; };

"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        var lookup = new Set(this._world.map(function (c) { return cellKey(c); }));
        this._lookup = function (x, y) { return lookup.has(cellKey({ x: x, y: y })); };
    }
    Game.prototype.putCell = function (cell) {
        if (this._lookup(cell.x, cell.y)) {
            return this;
        }
        var nextWorld = __spread(this._world, [cell]);
        return new Game(nextWorld);
    };
    /**
     * Gets the next instance of the Game of Life state
     */
    Game.prototype.tick = function () {
        var e_1, _a;
        var nextWorld = []; // next gamestate
        try {
            for (var _b = __values(this.cells()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var cell = _c.value;
                var neighbors = __spread(this.lookupNeighbors(cell));
                var alive = this._lookup(cell.x, cell.y);
                if (alive) {
                    // Rule 1.
                    var dies = underpopulated(neighbors.length);
                    if (dies) {
                        continue; // rip.
                    }
                    // Rule 2.
                    var lives = nextGeneration(neighbors.length);
                    if (lives) {
                        nextWorld.push(cell);
                        continue;
                    }
                    // Rule 3.
                    dies = overpopulated(neighbors.length);
                    if (dies) {
                        continue; // rip.
                    }
                }
                else {
                    // Rule 4.
                    var lives = reproduce(neighbors.length);
                    if (lives) {
                        nextWorld.push(cell);
                        continue;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return new Game(nextWorld);
    };
    Object.defineProperty(Game.prototype, "lookup", {
        get: function () {
            return this._lookup;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Iterates through all Cells in the World
     */
    Game.prototype.cells = function () {
        var _a, min, max, x, y;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = this.range(), min = _a.min, max = _a.max;
                    x = min.x;
                    _b.label = 1;
                case 1:
                    if (!(x <= max.x)) return [3 /*break*/, 6];
                    y = min.y;
                    _b.label = 2;
                case 2:
                    if (!(y <= max.y)) return [3 /*break*/, 5];
                    return [4 /*yield*/, { x: x, y: y }];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    ++y;
                    return [3 /*break*/, 2];
                case 5:
                    ++x;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    };
    /**
     * Reduces the World state into the minimum and maximum known cooridnates of living Cells.
     */
    Game.prototype.range = function () {
        var _a = this._world.reduce(function (_a, cell) {
            var min = _a.min, max = _a.max;
            return ({
                min: { x: cell.x < min.x ? cell.x : min.x, y: cell.y < min.y ? cell.y : min.y },
                max: { x: cell.x > max.x ? cell.x : max.x, y: cell.y > max.y ? cell.y : max.y }
            });
        }, { min: { x: 0, y: 0 }, max: { x: 0, y: 0 } }), min = _a.min, max = _a.max;
        // expand the edge of the world by 1 cell, this lets us detect dead cells on the edge
        min.x--;
        min.y--;
        max.x++;
        max.y++;
        return { min: min, max: max };
    };
    Game.prototype.lookupNeighbors = function (cell) {
        var _this = this;
        var neighbors = [
            { x: cell.x - 1, y: cell.y - 1 },
            { x: cell.x, y: cell.y - 1 },
            { x: cell.x + 1, y: cell.y - 1 },
            { x: cell.x - 1, y: cell.y },
            { x: cell.x + 1, y: cell.y },
            { x: cell.x - 1, y: cell.y + 1 },
            { x: cell.x, y: cell.y + 1 },
            { x: cell.x + 1, y: cell.y + 1 }
        ];
        return neighbors.filter(function (_a) {
            var x = _a.x, y = _a.y;
            return _this._lookup(x, y);
        });
    };
    Game.prototype.toString = function () {
        var _a = this.range(), min = _a.min, max = _a.max;
        var stringBuilder = [];
        for (var x = min.x; x <= max.x; ++x) {
            for (var y = min.y; y <= max.y; ++y) {
                stringBuilder.push(this._lookup(x, y) ? ' ⬛ ' : ' ⬜ ');
            }
            stringBuilder.push('\n');
        }
        return stringBuilder.join('');
    };
    return Game;
}());
exports.Game = Game;
var underpopulated = function (neighbors) { return neighbors < 2; };
var nextGeneration = function (neighbors) { return neighbors === 2 || neighbors === 3; };
var overpopulated = function (neighbors) { return neighbors > 2; };
var reproduce = function (neighbors) { return neighbors === 3; };
var cellKey = function (cell) { return cell.x + "_" + cell.y; };

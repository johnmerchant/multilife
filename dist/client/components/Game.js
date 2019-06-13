"use strict";
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
var actions_1 = require("../actions");
var CELL_HEIGHT = 12;
var CELL_WIDTH = 12;
var GameComponent = function (_a) {
    var world = _a.world, range = _a.range, setCell = _a.setCell, color = _a.color, width = _a.width, height = _a.height;
    var ref = react_1.useRef(null);
    react_1.useEffect(function () {
        var e_1, _a;
        var canvas = ref.current;
        if (canvas) {
            var ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, width * CELL_WIDTH, height * CELL_WIDTH);
                try {
                    for (var world_1 = __values(world), world_1_1 = world_1.next(); !world_1_1.done; world_1_1 = world_1.next()) {
                        var cell = world_1_1.value;
                        drawCell(ctx, cell);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (world_1_1 && !world_1_1.done && (_a = world_1.return)) _a.call(world_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
    }, [ref, range, world]);
    return react_1.default.createElement("canvas", { ref: ref, width: width * CELL_WIDTH, height: height * CELL_HEIGHT, onClick: function (event) {
            if (!color)
                return; // we don't have a color from the server yet...
            var canvas = event.target;
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            var cell = {
                x: Math.floor(x / CELL_WIDTH),
                y: Math.floor(y / CELL_HEIGHT),
                color: color
            };
            setCell(cell, true);
            var ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = color;
                drawCell(ctx, cell);
            }
        } });
};
var drawCell = function (ctx, cell) {
    ctx.fillStyle = cell.color;
    ctx.fillRect(cell.x * CELL_WIDTH, cell.y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
};
exports.Game = react_redux_1.connect(function (_a) {
    var game = _a.game;
    return ({ world: game.world, range: game.range, color: game.color });
}, function (dispatch) { return ({
    setCell: function (cell, alive) { return dispatch(actions_1.setCell(cell, alive)); }
}); })(GameComponent);

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
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var core_1 = require("@emotion/core");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var actions_1 = require("../actions");
var styles_1 = require("../styles");
var CELL_HEIGHT = 14;
var CELL_WIDTH = 14;
var GameComponent = function (_a) {
    var world = _a.world, range = _a.range, setCell = _a.setCell, color = _a.color;
    if (!color || typeof world === 'undefined' || typeof range === 'undefined') {
        return core_1.jsx("span", null, "Awaiting the World state...");
    }
    var ref = react_1.useRef(null);
    react_1.useEffect(function () {
        var e_1, _a;
        var canvas = ref.current;
        if (canvas) {
            var parent_1 = canvas.parentNode;
            if (parent_1) {
                var styles = getComputedStyle(parent_1);
                canvas.width = parseInt(styles.getPropertyValue('width'), 10);
                canvas.height = parseInt(styles.getPropertyValue('height'), 10);
            }
            var ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#000'; // back out
                ctx.fillRect(0, 0, canvas.width * CELL_WIDTH, canvas.height * CELL_WIDTH);
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
    return core_1.jsx("div", { css: styles_1.canvasContainerStyle },
        core_1.jsx("canvas", { ref: ref, width: "100%", height: "100%", onClick: function (event) {
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
            } }));
};
var drawCell = function (ctx, cell) {
    ctx.fillStyle = cell.color;
    ctx.shadowBlur = 2;
    ctx.shadowColor = cell.color;
    ctx.fillRect(cell.x * CELL_WIDTH, cell.y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
};
exports.Game = react_redux_1.connect(function (_a) {
    var game = _a.game;
    return ({ world: game.world, range: game.range, color: game.color });
}, function (dispatch) { return ({
    setCell: function (cell, alive) { return dispatch(actions_1.setCell(cell, alive)); }
}); })(GameComponent);

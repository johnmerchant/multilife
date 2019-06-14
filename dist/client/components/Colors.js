"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var core_1 = require("@emotion/core");
var styles_1 = require("../styles");
var react_redux_1 = require("react-redux");
var ColorsComponent = function (_a) {
    var colorRanking = _a.colorRanking, myColor = _a.myColor;
    if (!colorRanking)
        return core_1.jsx("div", null);
    return core_1.jsx("div", null,
        core_1.jsx("h4", null, "Population"),
        core_1.jsx("ol", { css: styles_1.populationListStyle }, colorRanking.map(function (_a, i) {
            var color = _a.color, count = _a.count;
            return core_1.jsx("li", { key: 'k' + i },
                core_1.jsx("span", { style: { display: 'inline-block', boxShadow: '0 0 2px ' + color, backgroundColor: color, width: '12px', height: '12px' } }),
                name,
                "\u00A0",
                count,
                "\u00A0",
                color === myColor ? core_1.jsx("em", null, "You") : null);
        })));
};
exports.Colors = react_redux_1.connect(function (state) { return ({ colorRanking: state.game.colorRanking, myColor: state.game.color }); })(ColorsComponent);

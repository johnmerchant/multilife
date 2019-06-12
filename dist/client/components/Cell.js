"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.Cell = function (_a) {
    var alive = _a.alive, onToggle = _a.onToggle;
    return react_1.default.createElement("div", { style: { width: "14px", height: "14px" }, onClick: function () { return onToggle(); } }, alive ? '⬛' : '◻️');
};

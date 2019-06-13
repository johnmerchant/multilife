"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Update"] = 0] = "Update";
    MessageType[MessageType["SetCell"] = 1] = "SetCell";
    MessageType[MessageType["Speed"] = 2] = "Speed";
    MessageType[MessageType["Color"] = 3] = "Color";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
function isUpdate(message) {
    return message.type === MessageType.Update;
}
exports.isUpdate = isUpdate;
function isSetCell(message) {
    return message.type === MessageType.SetCell;
}
exports.isSetCell = isSetCell;
function isSpeed(message) {
    return message.type === MessageType.Speed;
}
exports.isSpeed = isSpeed;
function isColor(message) {
    return message.type === MessageType.Color;
}
exports.isColor = isColor;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Update"] = 0] = "Update";
    MessageType[MessageType["SetCell"] = 1] = "SetCell";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
function isUpdate(message) {
    return message.type === MessageType.Update;
}
exports.isUpdate = isUpdate;
function isSetCell(message) {
    return message.type === MessageType.SetCell;
}
exports.isSetCell = isSetCell;

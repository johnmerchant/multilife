import {
    MessageType,
    ColorMessage,
    Message,
    NewColorMessage,
    PlayerCountMessage,
    SetCellMessage,
    isColorMessage,
    isUpdateMessage,
    isSetCellMessage,
    isPlayerCount,
    isNewColorMessage,
    UpdateMessage,
    Cell,
} from "../models";

import { rgbToHex, hexToRgb } from "./color";

const CELL_LENGTH = 15;
const COLOR_LENGTH = 12; // 3 * 4 bits

export const deserializeMessage = (data: Buffer): Message => {
    const messageType = data.readUInt8(0);
    switch (messageType) {
        case MessageType.Color:
            const color: ColorMessage = {
                type: MessageType.Color,
                color: readColor(data, 1)
            };
            return color;
        case MessageType.NewColor:
            const newColor: NewColorMessage = {
                type: MessageType.NewColor
            };
            return newColor;
        case MessageType.PlayerCount:
            const playerCount: PlayerCountMessage = {
                type: MessageType.PlayerCount,
                count: data.readUInt32LE(1)
            };
            return playerCount;
        case MessageType.SetCell:
            const setCell: SetCellMessage = {
                type: MessageType.SetCell,
                alive: data.readUInt8(1) !== 0,
                cell: readCell(data, 2)
            };
            return setCell;
        case MessageType.Update:
            const length = data.readUInt16LE(1);
            const world: Cell[] = new Array(length);
            for (let i = 0; i < length; ++i) {
                world[i] = readCell(data, (i * CELL_LENGTH) + 3);
            }
            const update: UpdateMessage = {
                type: MessageType.Update,
                world
            };
            return update;
        default:
            throw new Error("Unknown MessageType " + messageType);
    }
}

export const readColor = (data: Buffer, offset: number) => rgbToHex(
    data.readUInt32LE(offset),
    data.readUInt32LE(offset + 4), 
    data.readUInt32LE(offset + 8));

export const writeColor = (data: Buffer, offset: number, color: string) => {
    const [r,g,b] = hexToRgb(color);
    data.writeUInt32LE(r, offset);
    data.writeUInt32LE(g, offset + 4);
    data.writeUInt32LE(b, offset + 8);
};

const readCell = (data: Buffer, offset: number): Cell => ({
    x: data.readUInt8(offset),
    y: data.readUInt8(offset + 1),
    color: readColor(data, offset + 2)
});

const writeCell = (data: Buffer, offset: number, cell: Cell) => {
    data.writeUInt8(cell.x, offset);
    data.writeUInt8(cell.y, offset + 1);
    writeColor(data, 2, cell.color);
};

export const serializeMessage = (message: Message): Buffer => {
    // type guards let us infer the type of the message
    // unfortunately, cannot use switch statements with type guards, 
    // so here's some else if's!
    if (isUpdateMessage(message)) {
        const data = Buffer.alloc(3 + (message.world.length * CELL_LENGTH));
        data.writeUInt8(MessageType.Update, 0);
        data.writeUInt16LE(message.world.length, 1);
        for (let i = 0; i < message.world.length; ++i) {
            writeCell(data, (i * CELL_LENGTH) + 3, message.world[i]);
        }
        return data;
    } else if (isSetCellMessage(message)) {
        const data = Buffer.alloc(2 + CELL_LENGTH);
        data.writeUInt8(MessageType.SetCell, 0);
        data.writeUInt8(message.alive ? 0 : 1, 1);
        writeCell(data, 2, message.cell);
        return data;
    } else if (isColorMessage(message)) {
        const data = Buffer.alloc(1 + COLOR_LENGTH);
        data.writeUInt8(MessageType.Color, 0);
        writeColor(data, 1, message.color);
        return data;
    } else if (isPlayerCount(message)) {
        const data = Buffer.alloc(1 + 4);
        data.writeUInt8(MessageType.PlayerCount, 0);
        data.writeUInt32LE(message.count, 1);
        return data;
    } else if (isNewColorMessage(message)) {
        const data = Buffer.alloc(1);
        data.writeUInt8(MessageType.NewColor, 0);
        return data;
    }
    throw new Error('Unhandled message type ' + message);
};
import {
    MessageType,
    Message,
    NewColorMessage,
    PlayerCountMessage,
    SetCellMessage,
    isColorMessage,
    isUpdateMessage,
    isSetCellMessage,
    isPlayerCountMessage,
    isNewColorMessage,
    UpdateMessage,
    Cell,
    DrawCellsMessage,
    Point,
    ColorMessage,
    isDrawCellsMessage,
} from "../models";

import { rgbToHex, hexToRgb } from "./color";

const COLOR_LENGTH = 12;
const POINT_LENGTH = 2;
const CELL_HEADER_LENGTH = 1 + POINT_LENGTH;
const CELL_LENGTH = CELL_HEADER_LENGTH + COLOR_LENGTH;
const DRAW_CELLS_HEADER_LENGTH = 2 + COLOR_LENGTH;

export const deserializeMessage = (data: Buffer): Message => {
    const messageType = data.readUInt8(0);
    switch (messageType) {
        case MessageType.Color: return readColorMessage(data);
        case MessageType.NewColor: return readNewColor();
        case MessageType.PlayerCount: return readPlayerCount(data);
        case MessageType.SetCell: return readSetCell(data);
        case MessageType.Update: return readUpdate(data)
        case MessageType.DrawCells: return readDrawCells(data);
        default:
            throw new Error("Unknown MessageType " + messageType);
    }
};

const readColorMessage = (data: Buffer): ColorMessage => ({
    type: MessageType.Color,
    color: readColor(data, 1)
});

const readNewColor = (): NewColorMessage => ({
    type: MessageType.NewColor
});

const readPlayerCount = (data: Buffer): PlayerCountMessage => ({
    type: MessageType.PlayerCount,
    count: data.readUInt32LE(1)
});

const readSetCell = (data: Buffer): SetCellMessage => ({
    type: MessageType.SetCell,
    alive: data.readUInt8(1) !== 0,
    cell: readCell(data, 2)
});

const readUpdate = (data: Buffer): UpdateMessage => {
    const length = data.readUInt16LE(1);
    const world: Cell[] = new Array(length);
    for (let i = 0; i < length; ++i) {
        world[i] = readCell(data, (i * CELL_LENGTH) + CELL_HEADER_LENGTH);
    }
    return { type: MessageType.Update, world };
};

const readDrawCells = (data: Buffer): DrawCellsMessage => {
    const length = data.readUInt8(1);
    const cells: Point[] = new Array(length);
    const color = readColor(data, 2);
    for (let i = 0; i < length; ++i) {
        cells[i] = readPoint(data, DRAW_CELLS_HEADER_LENGTH + (POINT_LENGTH * i));
    }
    return {
        type: MessageType.DrawCells,
        cells,
        color
    };
};

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

const readPoint = (data: Buffer, offset: number): Point => ({
    x: data.readUInt8(offset),
    y: data.readUInt8(offset + 1)
});

const writeCell = (data: Buffer, offset: number, cell: Cell) => {
    writePoint(data, offset, cell);
    writeColor(data, offset + POINT_LENGTH, cell.color);
};

const writePoint = (data: Buffer, offset: number, point: Point) => {
    data.writeUInt8(point.x, offset);
    data.writeUInt8(point.y, offset + 1);
};

const writeUpdate = (message: UpdateMessage): Buffer => {
    const data = Buffer.alloc(3 + (message.world.length * CELL_LENGTH));
    data.writeUInt8(MessageType.Update, 0);
    data.writeUInt16LE(message.world.length, 1);
    for (let i = 0; i < message.world.length; ++i) {
        writeCell(data, (i * CELL_LENGTH) + CELL_HEADER_LENGTH, message.world[i]);
    }
    return data;
};

const writeSetCell = (message: SetCellMessage): Buffer => {
    const data = Buffer.alloc(2 + CELL_LENGTH);
    data.writeUInt8(MessageType.SetCell, 0);
    data.writeUInt8(message.alive ? 1 : 0, 1);
    writeCell(data, 2, message.cell);
    return data;
};

const writeColorMessage = (message: ColorMessage): Buffer => {
    const data = Buffer.alloc(1 + COLOR_LENGTH);
    data.writeUInt8(MessageType.Color, 0);
    writeColor(data, 1, message.color);
    return data;
};

const writePlayerCount = (message: PlayerCountMessage): Buffer => {
    const data = Buffer.alloc(1 + 4);
    data.writeUInt8(MessageType.PlayerCount, 0);
    data.writeUInt32LE(message.count, 1);
    return data;
};

const writeDrawCells = (message: DrawCellsMessage): Buffer => {
    const data = Buffer.alloc(DRAW_CELLS_HEADER_LENGTH + (message.cells.length * POINT_LENGTH));
    data.writeUInt8(MessageType.DrawCells, 0);
    data.writeUInt8(message.cells.length, 1);
    writeColor(data, 2, message.color);
    for (let i = 0; i < message.cells.length; ++i) {
        writePoint(data, DRAW_CELLS_HEADER_LENGTH + (i * POINT_LENGTH), message.cells[i]);
    }
    return data;
};

const writeNewColor = (): Buffer => {
    const data = Buffer.alloc(1);
    data.writeUInt8(MessageType.NewColor, 0);
    return data;
};

export const serializeMessage = (message: Message): Buffer => {
    if (isUpdateMessage(message)) return writeUpdate(message);
    else if (isSetCellMessage(message)) return writeSetCell(message);
    else if (isColorMessage(message)) return writeColorMessage(message); 
    else if (isPlayerCountMessage(message)) return writePlayerCount(message);
    else if (isDrawCellsMessage(message)) return writeDrawCells(message);
    else if (isNewColorMessage(message)) return writeNewColor();
    throw new Error('Unhandled message type ' + message);
};
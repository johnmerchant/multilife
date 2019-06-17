import { Cell } from "./cell";
import { World } from "./world";

export interface Message {
    type: MessageType;
}

export enum MessageType {
    Update,
    SetCell,
    Speed,
    Color,
    NewColor
}

export const isUpdate = (message: Message): message is Update => 
    message.type === MessageType.Update;

export interface Update extends Message {
    world: World;
}

export const isSetCell = (message: Message): message is SetCell =>
    message.type === MessageType.SetCell;

export interface SetCell extends Message {
    cell: Cell;
    alive: boolean;
}

export const isSpeed = (message: Message): message is Speed =>
    message.type === MessageType.Speed;
export interface Speed extends Message {
    speed: number;
}

export interface ColorMessage extends Message {
    color: string;
}

export const isColor = (message: Message): message is ColorMessage => 
    message.type === MessageType.Color;

export interface NewColorMessage extends Message { }

export const isNewColor = (message: Message): message is NewColorMessage =>
    message.type === MessageType.NewColor;
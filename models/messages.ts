import { Cell } from "./cell";
import { World } from "./world";

export interface Message {
    type: MessageType;
}

export enum MessageType {
    Update,
    SetCell
}

export function isUpdate(message: Message): message is Update {
    return message.type === MessageType.Update;
}

export interface Update extends Message {
    world: World;
}

export function isSetCell(message: Message): message is SetCell {
    return message.type === MessageType.SetCell;
}

export interface SetCell extends Message {
    cell: Cell;
    alive: boolean;
}
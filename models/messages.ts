import { Cell } from "./cell";
import { World } from "./world";
export interface Message {
    type: MessageType;
}

export enum MessageType {
    Update = 1,
    SetCell = 2,
    Color = 3,
    NewColor = 4,
    PlayerCount = 5
}

export const isUpdateMessage = (message: Message): message is UpdateMessage => 
    message.type === MessageType.Update;

export interface UpdateMessage extends Message {
    world: World;
}

export const isSetCellMessage = (message: Message): message is SetCellMessage =>
    message.type === MessageType.SetCell;

export interface SetCellMessage extends Message {
    cell: Cell;
    alive: boolean;
}

export interface ColorMessage extends Message {
    color: string;
}

export const isColorMessage = (message: Message): message is ColorMessage => 
    message.type === MessageType.Color;

export interface NewColorMessage extends Message { 

}

export const isNewColorMessage = (message: Message): message is NewColorMessage =>
    message.type === MessageType.NewColor;

export interface PlayerCountMessage extends Message {
    count: number;
}

export const isPlayerCount = (message: Message): message is PlayerCountMessage => 
    message.type === MessageType.PlayerCount;
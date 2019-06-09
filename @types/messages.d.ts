interface Message {
    type: MessageType;
}

export enum MessageType {
    Update,
    PutCell
}

export interface Update extends Message {
    world: World;
}

export interface PutCell extends Message {
    cell: Cell;
}
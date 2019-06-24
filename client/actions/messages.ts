import { Cell, MessageType, SetCellMessage, Message, NewColorMessage } from "../../models";
import { send } from "./socket";

export const setCell = (cell: Cell, alive: boolean) => sendMessage<SetCellMessage>({
    type: MessageType.SetCell,
    cell,
    alive
});

export const newColor = () => sendMessage<NewColorMessage>({ type: MessageType.NewColor });

const sendMessage = <T extends Message>(message: T) => send(message);
import * as http from 'http';
import * as ws from 'ws';
import { GameEvents } from './game-events';
import { Message, MessageType, PutCell, Update } from '../@types/messages';

export class Server {

    private events = new GameEvents();
    private httpServer: http.Server;
    private wsServer: ws.Server;

    constructor() {
        this.httpServer = http.createServer();
        this.wsServer = new ws.Server({ server: this.httpServer });
        this.wsServer.on('connection', connection => {
            connection.on('message', this.onMessage);
            const updateHandler = (world: World) => {
                const update: Update = {
                    type: MessageType.Update,
                    world
                };
                connection.send(JSON.stringify(update));
            };
            this.events.on('update', updateHandler);
            connection.on('close', () => this.events.off('update', updateHandler));
            this.events.emit('refresh');
        });
    }

    private onMessage(data: ws.Data) {
        try {
            const payload: Message = JSON.parse(String(data));
            switch (payload.type) {
                case MessageType.PutCell:
                    const putCell = payload as PutCell;
                    this.events.emit('putcell', putCell.cell);
                    break;
            }
        } catch (err) {
            console.error(err);
        }
    }

    run() {
        this.httpServer.listen(5000);
        return new Promise((resolve) => this.httpServer.on('close', () => resolve()));
    }
}
import * as http from 'http';
import * as ws from 'ws';
import { GameEvents } from './game-events';
import { Update, MessageType, Message, SetCell, World, Speed, Cell, ColorMessage, PlayerCountMessage } from '../models';
import {randomColor} from '../common/color';

export class Server {

    private _events = new GameEvents();
    private _httpServer: http.Server;
    private _wsServer: ws.Server;

    get connectionCount() {
        return [...this._wsServer.clients].length;
    }

    constructor() {
        this._httpServer = http.createServer();
        this._wsServer = new ws.Server({ server: this._httpServer });
        this._wsServer.on('connection', connection => {
            console.debug('client connected');
            this.broadcastPlayerCount();
            const sendColor = () => {
                const color = randomColor();
                const colorMessage: ColorMessage = {
                    type: MessageType.Color,
                    color
                };
                connection.send(JSON.stringify(colorMessage));
                return color;
            };
            let connectionColor = sendColor();

            connection.on('message', (data: ws.Data) => {
                try {
                    const payload: Message = JSON.parse(String(data));
                    switch (payload.type) {
                        case MessageType.SetCell:
                            const {cell, alive} = payload as SetCell;
                            console.debug({cell, alive});
                            this._events.emit('setcell', { ...cell, color: connectionColor }, alive);
                            break;
                        case MessageType.NewColor:
                            connectionColor = sendColor();
                            break;
                    }
                } catch (err) {
                    console.error(err);
                }
            });
            const updateHandler = (world: World) => {
                const update: Update = {
                    type: MessageType.Update,
                    world
                };
                connection.send(JSON.stringify(update));
            };
            const setCellHandler = (cell: Cell, alive: boolean) => {
                const setCell: SetCell = { type: MessageType.SetCell, cell, alive };
                connection.send(JSON.stringify(setCell));
            };
            this._events.on('update', (world: World) => updateHandler(world));
            connection.on('close', () => { 
                this._events.off('update', updateHandler);
                this._events.off('setcell', setCellHandler);
                this.broadcastPlayerCount();
            });
            this._events.emit('refresh');
        });
    }

    broadcastPlayerCount() {
        const message: PlayerCountMessage = { type: MessageType.PlayerCount, count: this.connectionCount };
        const data = JSON.stringify(message);
        console.log('connections: ' + message.count );
        this._wsServer.clients.forEach(client => client.send(data));
    }

    run() {
        const promise = new Promise((resolve) => this._httpServer.on('close', () => resolve()));
        this._httpServer.listen(5000, 'localhost', () => console.log('listening on localhost 5000'));
        return promise;
    }

}

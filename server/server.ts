import * as http from 'http';
import * as ws from 'ws';
import express from 'express';
import { GameEvents } from './game-events';
import { Update, MessageType, Message, SetCell, World, Speed, Cell } from '../models';

export class Server {

    private _app = express();
    private _events = new GameEvents();
    private _httpServer: http.Server;
    private _wsServer: ws.Server;

    constructor() {
        this._app.use(express.static('static'));
        this._httpServer = http.createServer(this._app);
        this._wsServer = new ws.Server({ server: this._httpServer });
        this._wsServer.on('connection', connection => {
            console.debug('client connected');
            connection.on('message', (data: ws.Data) => this.onMessage(data));
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
            const speedHandler = (speed: number) => {
                const speedMsg: Speed = { type: MessageType.Speed, speed };
                connection.send(JSON.stringify(speedMsg));
            };
            this._events.on('update', (world: World) => updateHandler(world));
            connection.on('close', () => { 
                this._events.off('update', updateHandler);
                this._events.off('setcell', setCellHandler);
                this._events.off('speed', speedHandler);
            });
            this._events.emit('refresh');
        });
    }

    private onMessage(data: ws.Data) {
        try {
            const payload: Message = JSON.parse(String(data));
            switch (payload.type) {
                case MessageType.SetCell:
                    const {cell, alive} = payload as SetCell;
                    console.debug({cell, alive});
                    this._events.emit('setcell', cell, alive);
                    break;
                case MessageType.Speed:
                    const {speed} = payload as Speed;
                    console.debug('speed: ' + speed);
                    this._events.emit('speed', speed);
                    break;
            }
        } catch (err) {
            console.error(err);
        }
    }

    run() {
        const promise = new Promise((resolve) => this._httpServer.on('close', () => resolve()));
        this._httpServer.listen(5000, () => console.log('listening on 5000'));
        return promise;
    }
}

import * as http from 'http';
import * as ws from 'ws';
import express from 'express';
import { GameEvents } from './game-events';
import { Update, MessageType, Message, SetCell, World } from '../models';
export class Server {

    private app = express();
    private events = new GameEvents();
    private httpServer: http.Server;
    private wsServer: ws.Server;

    constructor() {
        this.app.use(express.static('static'));
        this.httpServer = http.createServer(this.app);
        this.wsServer = new ws.Server({ server: this.httpServer });
        this.wsServer.on('connection', connection => {
            console.debug('client connected');
            connection.on('message', (data: ws.Data) => this.onMessage(data));
            const updateHandler = (world: World) => {
                const update: Update = {
                    type: MessageType.Update,
                    world
                };
                connection.send(JSON.stringify(update));
            };
            this.events.on('update', (world: World) => updateHandler(world));
            connection.on('close', () => this.events.off('update', updateHandler));
            this.events.emit('refresh');
        });
    }

    private onMessage(data: ws.Data) {
        try {
            const payload: Message = JSON.parse(String(data));
            switch (payload.type) {
                case MessageType.SetCell:
                    const {cell, alive} = payload as SetCell;
                    console.debug({cell, alive});
                    this.events.emit('setcell', cell, alive);
                    break;
            }
        } catch (err) {
            console.error(err);
        }
    }

    run() {
        const promise = new Promise((resolve) => this.httpServer.on('close', () => resolve()));
        this.httpServer.listen(5000, () => console.log('listening on 5000'));
        return promise;
    }
}

if (typeof require !== 'undefined' && require.main === module) {
    const server = new Server();
    (async () => {
        try {
            console.log('starting server...');
            await server.run();
        } catch (err) {
            console.error(err);
        }
    })();
}
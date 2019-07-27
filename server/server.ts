import * as http from 'http';
import * as ws from 'ws';
import * as dgram from 'dgram';
import { GameEvents } from './game-events';
import { randomColor } from '../common/color';
import { 
    UpdateMessage,
    MessageType,
    Message,
    SetCellMessage,
    World,
    Cell,
    ColorMessage,
    PlayerCountMessage,
    Point,
    DrawCellsMessage,
    isSetCellMessage,
    isDrawCellsMessage,
    isNewColorMessage
} from '../models';
import { deserializeMessage, serializeMessage } from '../common/protocol';
import { UdpServer } from './udp';

const UDP_PORT = 31337;

export class Server {

    private _events = new GameEvents();
    private _httpServer = http.createServer();
    private _wsServer = new ws.Server({ server: this._httpServer });
    private _udpServer = new UdpServer();

    get connectionCount() {
        return [...this._wsServer.clients].length;
    }

    constructor() {

        const updateHandler = (world: World) => {
            if (this._wsServer.clients.size === 0) return;
            const update: UpdateMessage = {
                type: MessageType.Update,
                world
            };
            const data = serializeMessage(update);
            this._wsServer.clients.forEach(c => c.send(data));
            this._udpServer.broadcast(data);
        };

        const setCellHandler = (cell: Cell, alive: boolean) => {
            if (this._wsServer.clients.size === 0) return;
            const setCell: SetCellMessage = { type: MessageType.SetCell, cell, alive };
            const data = serializeMessage(setCell);
            this._wsServer.clients.forEach(c => c.send(data));
            this._udpServer.broadcast(data);
        };

        const drawCellsHandler = (color: string, cells: Point[]) => {
            if (this._wsServer.clients.size === 0) return;
            const message: DrawCellsMessage = { type: MessageType.DrawCells, color, cells };
            const data = serializeMessage(message);
            this._wsServer.clients.forEach(c => c.send(data));
            this._udpServer.broadcast(data);
        };


        this._events.on('setcell', (cell: Cell, alive: boolean) => setCellHandler(cell, alive));
        this._events.on('drawcells', (color: string, cells: Point[]) => drawCellsHandler(color, cells));
        this._events.on('update', (world: World) => updateHandler(world));

        this._wsServer.on('connection', connection => {
            console.debug('client connected');
            if (this._events.isPaused) this._events.start();
            this.broadcastPlayerCount();
            const sendColor = () => {
                const color = randomColor();
                const colorMessage: ColorMessage = {
                    type: MessageType.Color,
                    color
                };
                connection.send(serializeMessage(colorMessage));
                return color;
            };

            let connectionColor = sendColor();

            connection.on('message', (data: ws.Data) => {
                try {
                    const message: Message = deserializeMessage(data as Buffer);
                    if (isSetCellMessage(message)) {
                        const {x, y} = message.cell;
                        this._events.emit('setcell', { x, y, color: connectionColor }, message.alive);
                    } else if (isDrawCellsMessage(message)) {
                        this._events.emit('drawcells', connectionColor, message.cells);
                    } else if (isNewColorMessage(message)) {
                        connectionColor = sendColor();
                    }
                } catch (err) {
                    console.error(err);
                }
            });
            connection.on('close', () => { 
                if (this._wsServer.clients.size === 0) {
                    this._events.stop();
                }
                this.broadcastPlayerCount();
            });
            this._events.emit('refresh');
        });
    }

    broadcastPlayerCount() {
        if (this._wsServer.clients.size === 0) return;
        const message: PlayerCountMessage = { type: MessageType.PlayerCount, count: this.connectionCount };
        const data = serializeMessage(message);
        console.log('connections: ' + message.count );
        this._wsServer.clients.forEach(client => client.send(data));
        this._udpServer.broadcast(data);
    }


    async run() {
        const http = new Promise((resolve) => this._httpServer.on('close', () => resolve()));
        this._httpServer.listen(5000, 'localhost', () => console.log('HTTP listening on localhost 5000'));
        const udp = this._udpServer.listen(UDP_PORT);
        await Promise.all([http, udp]);
    }

}

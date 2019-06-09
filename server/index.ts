import * as http from 'http';
import * as ws from 'ws';

export class Server {

    private httpServer: http.Server;
    private wsServer: ws.Server;

    constructor() {
        this.httpServer = http.createServer();
        this.wsServer = new ws.Server({ server: this.httpServer });
    }

    run() {
        this.httpServer.listen(5000);
        return new Promise((resolve) => this.httpServer.on('close', () => resolve()));
    }
}
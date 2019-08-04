import * as dgram from 'dgram';

interface Client {
    address: string;
    port: number;
}

const clientKey = (client: Client) => `${client.address}:${client.port}`;
const clientInfo = (str: string): Client => {
    const [address, port] = str.split(':');
    return { address, port: parseInt(port) };
};

export class UdpServer {

    private _clients = new Set<string>();
    private _socket = dgram.createSocket('udp4', (msg: Buffer, rinfo: dgram.RemoteInfo) => this.receive(msg, rinfo));

    constructor() {
        this._socket.on('error', err => console.error(err));
    }

    broadcast(data: Buffer) {
        [...this._clients].map(clientInfo).forEach(c => this._socket.send(data, c.port, c.address, err => {
            if (err) {
                this._clients.delete(clientKey(c));
                console.error(err);
            }
        }));
    }
    
    private receive(msg: Buffer, rinfo: dgram.RemoteInfo) {
        const status = msg.readUInt8(0);
        const key = clientKey(rinfo);
        if (status) { // available
            if (!this._clients.has(key)) {    
                this._clients.add(key);
            }
        } else { // unavailable
            this._clients.delete(key);
        }
    }

    listen(port: number) {
        const bind = new Promise((resolve) => this._socket.on('close', () => resolve()));
        this._socket.bind(port, () => console.log('UDP socket bound on ' + port));
        return bind;
    }
    
}
import * as dgram from 'dgram';

export class UdpServer {

    private _clients = new Set<dgram.RemoteInfo>();
    private _timeout = new Map<dgram.RemoteInfo, number>();
    private _socket = dgram.createSocket('udp4', (msg: Buffer, rinfo: dgram.RemoteInfo) => this.receive(msg, rinfo));

    constructor() {
        this._socket.on('error', err => console.error(err));
    }

    broadcast(data: Buffer) {
        this._clients.forEach(c => this._socket.send(data, c.port, c.address, err => {
            if (err) {
                this._clients.delete(c);
                console.error(err);
            }
        }));
    }
    
    private receive(msg: Buffer, rinfo: dgram.RemoteInfo) {
        const status = msg.readUInt8(0);
        if (status) { // available
            this._clients.add(rinfo);
            if (this._timeout.has(rinfo)) {
                clearTimeout(this._timeout.get(rinfo));
            }
            setTimeout(() => {
                this._clients.delete(rinfo);
                this._timeout.delete(rinfo);
            }, 1000 * 60);
        } else { // unavailable
            this._clients.delete(rinfo);
            if (this._timeout.has(rinfo)) {
                clearTimeout(this._timeout.get(rinfo));
                this._timeout.delete(rinfo);
            }
        }
    }

    listen(port: number) {
        const bind = new Promise((resolve) => this._socket.on('close', () => resolve()));
        this._socket.bind(port, () => console.log('UDP socket bound on ' + port));
        return bind;
    }
    
}
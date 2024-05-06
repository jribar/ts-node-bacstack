'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
const dgram_1 = require("dgram");
const events_1 = require("events");
class Transport extends events_1.EventEmitter {
    constructor(settings) {
        super();
        this._settings = settings;
        this._server = (0, dgram_1.createSocket)({ type: 'udp4', reuseAddr: true });
        this._server.on('message', (msg, rinfo) => this.emit('message', msg, rinfo.address));
        this._server.on('error', (err) => this.emit('message', err));
    }
    getBroadcastAddress() {
        return this._settings.broadcastAddress;
    }
    getMaxPayload() {
        return 1482;
    }
    send(buffer, offset, receiver) {
        this._server.send(buffer, 0, offset, this._settings.port, receiver);
    }
    open() {
        this._server.bind(this._settings.port, this._settings.interface, () => {
            this._server.setBroadcast(true);
        });
    }
    close() {
        this._server.close();
    }
}
exports.Transport = Transport;

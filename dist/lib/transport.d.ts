/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from 'events';
import { TransportSettings } from './types';
export declare class Transport extends EventEmitter {
    private _settings;
    private _server;
    constructor(settings: TransportSettings);
    getBroadcastAddress(): string | undefined;
    getMaxPayload(): number;
    send(buffer: Buffer, offset: number, receiver: string): void;
    open(): void;
    close(): void;
}

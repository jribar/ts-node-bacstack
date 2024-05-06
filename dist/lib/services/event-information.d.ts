/// <reference types="node" />
import { EncodeBuffer, BACNetEvent } from '../types';
export declare const encode: (buffer: EncodeBuffer, events: BACNetEvent[], moreEvents: boolean) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    alarms: any[];
    moreEvents: boolean;
};

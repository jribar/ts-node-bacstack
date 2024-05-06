/// <reference types="node" />
import { EncodeBuffer, BACNetObjectID } from '../types';
export declare const encode: (buffer: EncodeBuffer, subscriberProcessId: number, initiatingDeviceId: number, monitoredObjectId: BACNetObjectID, timeRemaining: number, values: any[]) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    subscriberProcessId: any;
    initiatingDeviceId: {
        type: any;
        instance: any;
    };
    monitoredObjectId: {
        type: any;
        instance: any;
    };
    timeRemaining: any;
    values: any[];
} | undefined;

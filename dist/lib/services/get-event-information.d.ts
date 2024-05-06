/// <reference types="node" />
import { EncodeBuffer, BACNetObjectID, BACNetEventInformation } from '../types';
export declare const encode: (buffer: EncodeBuffer, lastReceivedObjectId: BACNetObjectID) => void;
export declare const decode: (buffer: Buffer, offset: number) => {
    len: number;
    lastReceivedObjectId: {
        type: number;
        instance: number;
    };
};
export declare const encodeAcknowledge: (buffer: EncodeBuffer, events: BACNetEventInformation[], moreEvents: boolean) => void;
export declare const decodeAcknowledge: (buffer: Buffer, offset: number, apduLen: number) => any;

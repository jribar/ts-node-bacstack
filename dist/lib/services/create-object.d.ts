/// <reference types="node" />
import { EncodeBuffer, BACNetObjectID } from '../types';
export declare const encode: (buffer: EncodeBuffer, objectId: BACNetObjectID, values: any[]) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    objectId: {
        type: number;
        instance: number;
    };
    values: any[];
} | undefined;
export declare const encodeAcknowledge: (buffer: EncodeBuffer, objectId: BACNetObjectID) => void;

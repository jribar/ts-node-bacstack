/// <reference types="node" />
import { BACNetObjectID, EncodeBuffer } from '../types';
export declare const encode: (buffer: EncodeBuffer, isStream: boolean, objectId: BACNetObjectID, position: number, blocks: number[][]) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    isStream: boolean;
    objectId: {
        type: any;
        instance: any;
    };
    position: number;
    blocks: any[];
} | undefined;
export declare const encodeAcknowledge: (buffer: EncodeBuffer, isStream: boolean, position: number) => void;
export declare const decodeAcknowledge: (buffer: Buffer, offset: number) => {
    len: number;
    isStream: boolean;
    position: number;
} | undefined;

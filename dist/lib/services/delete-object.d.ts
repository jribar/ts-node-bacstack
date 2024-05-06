/// <reference types="node" />
import { EncodeBuffer, BACNetObjectID } from '../types';
export declare const encode: (buffer: EncodeBuffer, objectId: BACNetObjectID) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    objectType: number;
    instance: number;
} | undefined;

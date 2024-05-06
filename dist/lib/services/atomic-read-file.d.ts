/// <reference types="node" />
import { EncodeBuffer, BACNetObjectID } from '../types';
export declare const encode: (buffer: EncodeBuffer, isStream: boolean, objectId: BACNetObjectID, position: number, count: number) => void;
export declare const decode: (buffer: Buffer, offset: number) => {
    len: number;
    isStream: boolean;
    objectId: {};
    position: number;
    count: number;
} | undefined;
export declare const encodeAcknowledge: (buffer: EncodeBuffer, isStream: boolean, endOfFile: boolean, position: number, blockCount: number, blocks: number[][], counts: number[]) => void;
export declare const decodeAcknowledge: (buffer: Buffer, offset: number) => {
    len: number;
    endOfFile: boolean;
    isStream: boolean;
    position: number;
    buffer: Buffer;
} | undefined;

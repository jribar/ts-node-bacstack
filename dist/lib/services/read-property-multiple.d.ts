/// <reference types="node" />
import { EncodeBuffer } from '../types';
export declare const encode: (buffer: EncodeBuffer, properties: any[]) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    properties: any[];
} | undefined;
export declare const encodeAcknowledge: (buffer: EncodeBuffer, values: any[]) => void;
export declare const decodeAcknowledge: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    values: any[];
} | undefined;

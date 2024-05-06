/// <reference types="node" />
import { EncodeBuffer } from '../types';
export declare const encode: (buffer: EncodeBuffer, time: Date) => void;
export declare const decode: (buffer: Buffer, offset: number) => {
    len: number;
    value: Date;
} | undefined;

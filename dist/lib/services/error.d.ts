/// <reference types="node" />
import { EncodeBuffer } from '../types';
export declare const encode: (buffer: EncodeBuffer, errorClass: number, errorCode: number) => void;
export declare const decode: (buffer: Buffer, offset: number) => {
    len: number;
    class: number;
    code: number;
};

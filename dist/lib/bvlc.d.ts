/// <reference types="node" />
export declare const encode: (buffer: Buffer, func: number, msgLength: number) => number;
export declare const decode: (buffer: Buffer, offset: number) => {
    len: number;
    func: number;
    msgLength: number;
} | undefined;

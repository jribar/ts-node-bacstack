/// <reference types="node" />
import { EncodeBuffer } from '../types';
export declare const encode: (buffer: EncodeBuffer, deviceId: number, maxApdu: number, segmentation: number, vendorId: number) => void;
export declare const decode: (buffer: Buffer, offset: number) => {
    len: number;
    deviceId: any;
    maxApdu: any;
    segmentation: any;
    vendorId: any;
} | undefined;

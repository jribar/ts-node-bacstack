/// <reference types="node" />
import { EncodeBuffer } from '../types';
export declare const encode: (buffer: EncodeBuffer, vendorId: number, serviceNumber: number, data: number[]) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => any;

/// <reference types="node" />
import { EncodeBuffer } from '../types';
export declare const encode: (buffer: EncodeBuffer, data: any) => void;
export declare const decode: (buffer: Buffer, offset: number) => any;

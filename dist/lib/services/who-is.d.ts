/// <reference types="node" />
import { EncodeBuffer } from '../types';
export declare const encode: (buffer: EncodeBuffer, lowLimit: number, highLimit: number) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => any;

/// <reference types="node" />
import { EncodeBuffer } from '../types';
export declare const encode: (buffer: EncodeBuffer, state: number, password: string) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => any;

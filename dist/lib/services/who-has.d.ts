/// <reference types="node" />
import { BACNetObjectID, EncodeBuffer } from '../types';
export declare const encode: (buffer: EncodeBuffer, lowLimit: number, highLimit: number, objectId: BACNetObjectID, objectName: string) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => any;

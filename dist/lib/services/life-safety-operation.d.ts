/// <reference types="node" />
import { EncodeBuffer, BACNetObjectID } from '../types';
export declare const encode: (buffer: EncodeBuffer, processId: number, requestingSource: string, operation: number, targetObjectId: BACNetObjectID) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => any;

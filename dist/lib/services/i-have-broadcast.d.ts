/// <reference types="node" />
import { EncodeBuffer, BACNetObjectID } from '../types';
export declare const encode: (buffer: EncodeBuffer, deviceId: BACNetObjectID, objectId: BACNetObjectID, objectName: string) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => any;

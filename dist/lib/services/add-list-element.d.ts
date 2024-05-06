/// <reference types="node" />
import { EncodeBuffer, BACNetObjectID } from '../types';
export declare const encode: (buffer: EncodeBuffer, objectId: BACNetObjectID, propertyId: number, arrayIndex: number, values: any) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => any;

/// <reference types="node" />
import { EncodeBuffer, BACNetObjectID } from '../types';
export declare const encode: (buffer: EncodeBuffer, objectType: number, objectInstance: number, propertyId: number, arrayIndex: number) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    objectId: {
        type: any;
        instance: any;
    };
    property: any;
} | undefined;
export declare const encodeAcknowledge: (buffer: EncodeBuffer, objectId: BACNetObjectID, propertyId: number, arrayIndex: number, values: any[]) => void;
export declare const decodeAcknowledge: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    objectId: any;
    property: any;
    values: any[];
} | undefined;

/// <reference types="node" />
import { EncodeBuffer, BACNetAppData } from '../types';
export declare const encode: (buffer: EncodeBuffer, objectType: number, objectInstance: number, propertyId: number, arrayIndex: number, priority: number, values: BACNetAppData[]) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    objectId: {
        type: any;
        instance: any;
    };
    value: any;
} | undefined;

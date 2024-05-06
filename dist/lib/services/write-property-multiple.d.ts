/// <reference types="node" />
import { EncodeBuffer, BACNetObjectID, BACNetPropertyID, BACNetAppData } from '../types';
interface BACNETWPM {
    property: BACNetPropertyID;
    value: BACNetAppData[];
    priority: number;
}
export declare const encode: (buffer: EncodeBuffer, objectId: BACNetObjectID, values: BACNETWPM[]) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    objectId: {
        type: any;
        instance: any;
    };
    values: any[];
} | undefined;
export declare const encodeObject: (buffer: EncodeBuffer, values: any[]) => void;
export {};

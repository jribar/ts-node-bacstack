/// <reference types="node" />
import { EncodeBuffer, BACNetObjectID, BACNetBitString } from '../types';
export declare const encode: (buffer: EncodeBuffer, objectId: BACNetObjectID, propertyId: number, arrayIndex: number, requestType: number, position: number, time: Date, count: number) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    objectId: {
        type: any;
        instance: any;
    };
    property: any;
    requestType: number;
    position: number;
    time: Date;
    count: number;
} | undefined;
export declare const encodeAcknowledge: (buffer: EncodeBuffer, objectId: BACNetObjectID, propertyId: number, arrayIndex: number, resultFlags: BACNetBitString, itemCount: number, applicationData: Buffer, requestType: number, firstSequence: number) => void;
export declare const decodeAcknowledge: (buffer: Buffer, offset: number, apduLen: number) => {
    objectId: {
        type: any;
        instance: any;
    };
    property: any;
    resultFlag: any;
    itemCount: any;
    rangeBuffer: Buffer;
    len: number;
} | undefined;

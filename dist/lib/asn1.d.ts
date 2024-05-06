/// <reference types="node" />
import { EncodeBuffer, BACNetReadAccessSpecification, BACNetBitString, BACNetAppData, BACNetPropertyState, BACNetDevObjRef, BACNetObjectID, BACNetPropertyID } from './types';
export declare const decodeUnsigned: (buffer: Buffer, offset: number, length: number) => {
    len: number;
    value: number;
};
export declare const decodeEnumerated: (buffer: Buffer, offset: number, lenValue: number) => {
    len: number;
    value: number;
};
export declare const encodeBacnetObjectId: (buffer: EncodeBuffer, objectType: number, instance: number) => void;
export declare const encodeTag: (buffer: EncodeBuffer, tagNumber: number, contextSpecific: boolean, lenValueType: number) => void;
export declare const encodeContextReal: (buffer: EncodeBuffer, tagNumber: number, value: number) => void;
export declare const encodeContextUnsigned: (buffer: EncodeBuffer, tagNumber: number, value: number) => void;
export declare const encodeContextEnumerated: (buffer: EncodeBuffer, tagNumber: number, value: number) => void;
export declare const encodeApplicationOctetString: (buffer: EncodeBuffer, octetString: number[], octetOffset: number, octetCount: number) => void;
export declare const encodeApplicationBoolean: (buffer: EncodeBuffer, booleanValue: boolean) => void;
export declare const encodeApplicationObjectId: (buffer: EncodeBuffer, objectType: number, instance: number) => void;
export declare const encodeApplicationUnsigned: (buffer: EncodeBuffer, value: number) => void;
export declare const encodeApplicationEnumerated: (buffer: EncodeBuffer, value: number) => void;
export declare const encodeApplicationSigned: (buffer: EncodeBuffer, value: number) => void;
export declare const encodeApplicationBitstring: (buffer: EncodeBuffer, bitString: BACNetBitString) => void;
export declare const encodeApplicationDate: (buffer: EncodeBuffer, value: Date) => void;
export declare const encodeApplicationTime: (buffer: EncodeBuffer, value: Date) => void;
export declare const encodeContextObjectId: (buffer: EncodeBuffer, tagNumber: number, objectType: number, instance: number) => void;
export declare const encodeOpeningTag: (buffer: EncodeBuffer, tagNumber: number) => void;
export declare const encodeClosingTag: (buffer: EncodeBuffer, tagNumber: number) => void;
export declare const encodeReadAccessSpecification: (buffer: EncodeBuffer, value: BACNetReadAccessSpecification) => void;
export declare const encodeContextBoolean: (buffer: EncodeBuffer, tagNumber: number, booleanValue: boolean) => void;
export declare const bacappEncodeApplicationData: (buffer: EncodeBuffer, value: BACNetAppData) => void;
export declare const bacappEncodeContextDeviceObjPropertyRef: (buffer: EncodeBuffer, tagNumber: number, value: BACNetDevObjRef) => void;
export declare const bacappEncodePropertyState: (buffer: EncodeBuffer, value: BACNetPropertyState) => void;
export declare const encodeContextBitstring: (buffer: EncodeBuffer, tagNumber: number, bitString: BACNetBitString) => void;
export declare const encodeContextSigned: (buffer: EncodeBuffer, tagNumber: number, value: number) => void;
export declare const decodeTagNumber: (buffer: Buffer, offset: number) => {
    len: number;
    tagNumber: number;
};
export declare const decodeIsContextTag: (buffer: Buffer, offset: number, tagNumber: number) => boolean;
export declare const decodeIsOpeningTagNumber: (buffer: Buffer, offset: number, tagNumber: number) => boolean;
export declare const decodeIsClosingTagNumber: (buffer: Buffer, offset: number, tagNumber: number) => boolean;
export declare const decodeIsClosingTag: (buffer: Buffer, offset: number) => boolean;
export declare const decodeIsOpeningTag: (buffer: Buffer, offset: number) => boolean;
export declare const decodeObjectId: (buffer: Buffer, offset: number) => {
    len: number;
    objectType: number;
    instance: number;
};
export declare const decodeTagNumberAndValue: (buffer: Buffer, offset: number) => {
    len: number;
    tagNumber: number;
    value: number;
};
export declare const bacappDecodeApplicationData: (buffer: Buffer, offset: number, maxOffset: number, objectType: number, propertyId: number) => any;
interface BACNetReadAccessResult {
    objectId: BACNetObjectID;
    values: {
        property: BACNetPropertyID;
        value: any[];
    }[];
}
export declare const encodeReadAccessResult: (buffer: EncodeBuffer, value: BACNetReadAccessResult) => void;
export declare const decodeReadAccessResult: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    value: any;
} | undefined;
export declare const decodeSigned: (buffer: Buffer, offset: number, length: number) => {
    len: number;
    value: number;
};
export declare const decodeReal: (buffer: Buffer, offset: number) => {
    len: number;
    value: number;
};
export declare const decodeOctetString: (buffer: Buffer, offset: number, maxLength: number, octetStringOffset: number, octetStringLength: number) => {
    len: number;
    value: number[];
};
export declare const decodeCharacterString: (buffer: Buffer, offset: number, maxLength: number, lenValue: number) => {
    value: string;
    len: number;
    encoding: number;
};
export declare const decodeBitstring: (buffer: Buffer, offset: number, lenValue: number) => {
    len: number;
    value: {
        value: number[];
        bitsUsed: 0;
    };
};
export declare const decodeDate: (buffer: Buffer, offset: number) => {
    len: number;
    value: Date;
};
export declare const decodeApplicationDate: (buffer: Buffer, offset: number) => {
    len: number;
    value: Date;
} | undefined;
export declare const decodeBacnetTime: (buffer: Buffer, offset: number) => {
    len: number;
    value: Date;
};
export declare const decodeApplicationTime: (buffer: Buffer, offset: number) => {
    len: number;
    value: Date;
} | undefined;
export declare const decodeReadAccessSpecification: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    value: any;
} | undefined;
export declare const bacappEncodeTimestamp: (buffer: EncodeBuffer, value: {
    type: number;
    value: any;
}) => void;
export declare const bacappEncodeContextTimestamp: (buffer: EncodeBuffer, tagNumber: number, value: {
    type: number;
    value: any;
}) => void;
export declare const decodeContextCharacterString: (buffer: Buffer, offset: number, maxLength: number, tagNumber: number) => {
    len: number;
    value: string;
    encoding: number;
} | undefined;
export declare const decodeContextObjectId: (buffer: Buffer, offset: number, tagNumber: number) => {
    len: number;
    objectType: number;
    instance: number;
} | undefined;
export declare const encodeApplicationCharacterString: (buffer: EncodeBuffer, value: string, encoding?: number) => void;
export declare const encodeContextCharacterString: (buffer: EncodeBuffer, tagNumber: number, value: string, encoding?: number) => void;
export {};

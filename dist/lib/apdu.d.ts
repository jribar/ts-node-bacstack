/// <reference types="node" />
import { EncodeBuffer } from './types';
export declare const getDecodedType: (buffer: Buffer, offset: number) => number;
export declare const setDecodedType: (buffer: Buffer, offset: number, type: number) => void;
export declare const getDecodedInvokeId: (buffer: Buffer, offset: number) => number | undefined;
export declare const encodeConfirmedServiceRequest: (buffer: EncodeBuffer, type: number, service: number, maxSegments: number, maxApdu: number, invokeId: number, sequencenumber?: number, proposedWindowSize?: number) => void;
export declare const decodeConfirmedServiceRequest: (buffer: Buffer, offset: number) => {
    len: number;
    type: number;
    service: number;
    maxSegments: number;
    maxApdu: number;
    invokeId: number;
    sequencenumber: number;
    proposedWindowNumber: number;
};
export declare const encodeUnconfirmedServiceRequest: (buffer: EncodeBuffer, type: number, service: number) => void;
export declare const decodeUnconfirmedServiceRequest: (buffer: Buffer, offset: number) => {
    len: number;
    type: number;
    service: number;
};
export declare const encodeSimpleAck: (buffer: EncodeBuffer, type: number, service: number, invokeId: number) => void;
export declare const decodeSimpleAck: (buffer: Buffer, offset: number) => {
    len: number;
    type: number;
    service: number;
    invokeId: number;
};
export declare const encodeComplexAck: (buffer: EncodeBuffer, type: number, service: number, invokeId: number, sequencenumber?: number, proposedWindowNumber?: number) => number;
export declare const decodeComplexAck: (buffer: Buffer, offset: number) => {
    len: number;
    type: number;
    service: number;
    invokeId: number;
    sequencenumber: number;
    proposedWindowNumber: number;
};
export declare const encodeSegmentAck: (buffer: EncodeBuffer, type: number, originalInvokeId: number, sequencenumber: number, actualWindowSize: number) => void;
export declare const decodeSegmentAck: (buffer: Buffer, offset: number) => {
    len: number;
    type: number;
    originalInvokeId: number;
    sequencenumber: number;
    actualWindowSize: number;
};
export declare const encodeError: (buffer: EncodeBuffer, type: number, service: number, invokeId: number) => void;
export declare const decodeError: (buffer: Buffer, offset: number) => {
    len: number;
    type: number;
    service: number;
    invokeId: number;
};
export declare const encodeAbort: (buffer: EncodeBuffer, type: number, invokeId: number, reason: number) => void;
export declare const decodeAbort: (buffer: Buffer, offset: number) => {
    len: number;
    type: number;
    invokeId: number;
    reason: number;
};

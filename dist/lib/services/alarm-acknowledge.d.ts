/// <reference types="node" />
import { EncodeBuffer, BACNetObjectID } from '../types';
export declare const encode: (buffer: EncodeBuffer, ackProcessId: number, eventObjectId: BACNetObjectID, eventStateAcknowledged: number, ackSource: string, eventTimeStamp: any, ackTimeStamp: any) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => any;

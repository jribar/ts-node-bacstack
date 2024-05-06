/// <reference types="node" />
import { EncodeBuffer, BACNetObjectID } from '../types';
export declare const encode: (buffer: EncodeBuffer, subscriberProcessId: number, monitoredObjectId: BACNetObjectID, cancellationRequest: boolean, issueConfirmedNotifications: boolean, lifetime: number) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => any;

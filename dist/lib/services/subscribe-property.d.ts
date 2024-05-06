/// <reference types="node" />
import { EncodeBuffer, BACNetObjectID, BACNetPropertyID } from '../types';
export declare const encode: (buffer: EncodeBuffer, subscriberProcessId: number, monitoredObjectId: BACNetObjectID, cancellationRequest: boolean, issueConfirmedNotifications: boolean, lifetime: number, monitoredProperty: BACNetPropertyID, covIncrementPresent: boolean, covIncrement: number) => void;
export declare const decode: (buffer: Buffer, offset: number) => any;

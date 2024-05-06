/// <reference types="node" />
import { EncodeBuffer } from '../types';
export declare const encode: (buffer: EncodeBuffer, acknowledgmentFilter: number, enrollmentFilter?: any, eventStateFilter?: number, eventTypeFilter?: number, priorityFilter?: any, notificationClassFilter?: number) => void;
export declare const decode: (buffer: Buffer, offset: number) => any;
export declare const encodeAcknowledge: (buffer: EncodeBuffer, enrollmentSummaries: any[]) => void;
export declare const decodeAcknowledge: (buffer: Buffer, offset: number, apduLen: number) => {
    enrollmentSummaries: any[];
    len: number;
} | undefined;

/// <reference types="node" />
import { EncodeBuffer, BACNetAlarm } from '../types';
export declare const encode: (buffer: EncodeBuffer, alarms: BACNetAlarm[]) => void;
export declare const decode: (buffer: Buffer, offset: number, apduLen: number) => {
    len: number;
    alarms: BACNetAlarm[];
};

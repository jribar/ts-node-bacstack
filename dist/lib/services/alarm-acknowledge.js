'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = void 0;
const baAsn1 = __importStar(require("../asn1"));
const baEnum = __importStar(require("../enum"));
const encode = (buffer, ackProcessId, eventObjectId, eventStateAcknowledged, ackSource, eventTimeStamp, ackTimeStamp) => {
    baAsn1.encodeContextUnsigned(buffer, 0, ackProcessId);
    baAsn1.encodeContextObjectId(buffer, 1, eventObjectId.type, eventObjectId.instance);
    baAsn1.encodeContextEnumerated(buffer, 2, eventStateAcknowledged);
    baAsn1.bacappEncodeContextTimestamp(buffer, 3, eventTimeStamp);
    baAsn1.encodeContextCharacterString(buffer, 4, ackSource);
    baAsn1.bacappEncodeContextTimestamp(buffer, 5, ackTimeStamp);
};
exports.encode = encode;
const decode = (buffer, offset, apduLen) => {
    let len = 0;
    const value = {};
    let result;
    let decodedValue;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
    len += decodedValue.len;
    value.acknowledgedProcessId = decodedValue.value;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeObjectId(buffer, offset + len);
    len += decodedValue.len;
    value.eventObjectId = { type: decodedValue.objectType, instance: decodedValue.instance };
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeEnumerated(buffer, offset + len, result.value);
    len += decodedValue.len;
    value.eventStateAcknowledged = decodedValue.value;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    if (result.tagNumber === baEnum.TimeStamp.TIME) {
        decodedValue = baAsn1.decodeBacnetTime(buffer, offset + len);
        len += decodedValue.len;
        value.eventTimeStamp = decodedValue.value;
    }
    else if (result.tagNumber === baEnum.TimeStamp.SEQUENCE_NUMBER) {
        decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
        len += decodedValue.len;
        value.eventTimeStamp = decodedValue.value;
    }
    else if (result.tagNumber === baEnum.TimeStamp.DATETIME) {
        const dateRaw = baAsn1.decodeApplicationDate(buffer, offset + len);
        len += dateRaw.len;
        const date = dateRaw.value;
        const timeRaw = baAsn1.decodeApplicationTime(buffer, offset + len);
        len += timeRaw.len;
        const time = timeRaw.value;
        value.eventTimeStamp = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
        len++;
    }
    len++;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeCharacterString(buffer, offset + len, apduLen - (offset + len), result.value);
    value.acknowledgeSource = decodedValue.value;
    len += decodedValue.len;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    if (result.tagNumber === baEnum.TimeStamp.TIME) {
        decodedValue = baAsn1.decodeBacnetTime(buffer, offset + len);
        len += decodedValue.len;
        value.acknowledgeTimeStamp = decodedValue.value;
    }
    else if (result.tagNumber === baEnum.TimeStamp.SEQUENCE_NUMBER) {
        decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
        len += decodedValue.len;
        value.acknowledgeTimeStamp = decodedValue.value;
    }
    else if (result.tagNumber === baEnum.TimeStamp.DATETIME) {
        const dateRaw = baAsn1.decodeApplicationDate(buffer, offset + len);
        len += dateRaw.len;
        const date = dateRaw.value;
        const timeRaw = baAsn1.decodeApplicationTime(buffer, offset + len);
        len += timeRaw.len;
        const time = timeRaw.value;
        value.acknowledgeTimeStamp = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
        len++;
    }
    len++;
    value.len = len;
    return value;
};
exports.decode = decode;

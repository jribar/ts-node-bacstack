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
const encode = (buffer, subscriberProcessId, initiatingDeviceId, monitoredObjectId, timeRemaining, values) => {
    baAsn1.encodeContextUnsigned(buffer, 0, subscriberProcessId);
    baAsn1.encodeContextObjectId(buffer, 1, baEnum.ObjectType.DEVICE, initiatingDeviceId);
    baAsn1.encodeContextObjectId(buffer, 2, monitoredObjectId.type, monitoredObjectId.instance);
    baAsn1.encodeContextUnsigned(buffer, 3, timeRemaining);
    baAsn1.encodeOpeningTag(buffer, 4);
    values.forEach((value) => {
        baAsn1.encodeContextEnumerated(buffer, 0, value.property.id);
        if (value.property.index === baEnum.ASN1_ARRAY_ALL) {
            baAsn1.encodeContextUnsigned(buffer, 1, value.property.index);
        }
        baAsn1.encodeOpeningTag(buffer, 2);
        value.value.forEach((v) => baAsn1.bacappEncodeApplicationData(buffer, v));
        baAsn1.encodeClosingTag(buffer, 2);
        if (value.priority === baEnum.ASN1_NO_PRIORITY) {
            baAsn1.encodeContextUnsigned(buffer, 3, value.priority);
        }
        // TODO: Handle to too large telegrams -> APDU limit
    });
    baAsn1.encodeClosingTag(buffer, 4);
};
exports.encode = encode;
const decode = (buffer, offset, apduLen) => {
    let len = 0;
    let result;
    let decodedValue;
    if (!baAsn1.decodeIsContextTag(buffer, offset + len, 0))
        return;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
    len += decodedValue.len;
    const subscriberProcessId = decodedValue.value;
    if (!baAsn1.decodeIsContextTag(buffer, offset + len, 1))
        return;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeObjectId(buffer, offset + len);
    len += decodedValue.len;
    const initiatingDeviceId = { type: decodedValue.objectType, instance: decodedValue.instance };
    if (!baAsn1.decodeIsContextTag(buffer, offset + len, 2))
        return;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeObjectId(buffer, offset + len);
    len += decodedValue.len;
    const monitoredObjectId = { type: decodedValue.objectType, instance: decodedValue.instance };
    if (!baAsn1.decodeIsContextTag(buffer, offset + len, 3))
        return;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
    len += decodedValue.len;
    const timeRemaining = decodedValue.value;
    if (!baAsn1.decodeIsOpeningTagNumber(buffer, offset + len, 4))
        return;
    len++;
    const values = [];
    while ((apduLen - len) > 1 && !baAsn1.decodeIsClosingTagNumber(buffer, offset + len, 4)) {
        const newEntry = {};
        newEntry.property = {};
        if (!baAsn1.decodeIsContextTag(buffer, offset + len, 0))
            return;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        decodedValue = baAsn1.decodeEnumerated(buffer, offset + len, result.value);
        len += decodedValue.len;
        newEntry.property.id = decodedValue.value;
        if (baAsn1.decodeIsContextTag(buffer, offset + len, 1)) {
            result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
            len += result.len;
            decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
            len += decodedValue.len;
            newEntry.property.index = decodedValue.value;
        }
        else {
            newEntry.property.index = baEnum.ASN1_ARRAY_ALL;
        }
        if (!baAsn1.decodeIsOpeningTagNumber(buffer, offset + len, 2))
            return;
        len++;
        const properties = [];
        while ((apduLen - len) > 1 && !baAsn1.decodeIsClosingTagNumber(buffer, offset + len, 2)) {
            decodedValue = baAsn1.bacappDecodeApplicationData(buffer, offset + len, apduLen + offset, monitoredObjectId.type, newEntry.property.id);
            if (!decodedValue)
                return;
            len += decodedValue.len;
            delete decodedValue.len;
            properties.push(decodedValue);
        }
        newEntry.value = properties;
        len++;
        if (baAsn1.decodeIsContextTag(buffer, offset + len, 3)) {
            result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
            len += result.len;
            decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
            len += decodedValue.len;
            newEntry.priority = decodedValue.value;
        }
        else {
            newEntry.priority = baEnum.ASN1_NO_PRIORITY;
        }
        values.push(newEntry);
    }
    return {
        len: len,
        subscriberProcessId: subscriberProcessId,
        initiatingDeviceId: initiatingDeviceId,
        monitoredObjectId: monitoredObjectId,
        timeRemaining: timeRemaining,
        values: values
    };
};
exports.decode = decode;

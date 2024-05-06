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
const encode = (buffer, subscriberProcessId, monitoredObjectId, cancellationRequest, issueConfirmedNotifications, lifetime, monitoredProperty, covIncrementPresent, covIncrement) => {
    baAsn1.encodeContextUnsigned(buffer, 0, subscriberProcessId);
    baAsn1.encodeContextObjectId(buffer, 1, monitoredObjectId.type, monitoredObjectId.instance);
    if (!cancellationRequest) {
        baAsn1.encodeContextBoolean(buffer, 2, issueConfirmedNotifications);
        baAsn1.encodeContextUnsigned(buffer, 3, lifetime);
    }
    baAsn1.encodeOpeningTag(buffer, 4);
    baAsn1.encodeContextEnumerated(buffer, 0, monitoredProperty.id);
    if (monitoredProperty.index !== baEnum.ASN1_ARRAY_ALL) {
        baAsn1.encodeContextUnsigned(buffer, 1, monitoredProperty.index);
    }
    baAsn1.encodeClosingTag(buffer, 4);
    if (covIncrementPresent) {
        baAsn1.encodeContextReal(buffer, 5, covIncrement);
    }
};
exports.encode = encode;
const decode = (buffer, offset) => {
    let len = 0;
    const value = {};
    let result;
    let decodedValue;
    if (!baAsn1.decodeIsContextTag(buffer, offset + len, 0))
        return;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
    len += decodedValue.len;
    value.subscriberProcessId = decodedValue.value;
    if (!baAsn1.decodeIsContextTag(buffer, offset + len, 1))
        return;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeObjectId(buffer, offset + len);
    len += decodedValue.len;
    value.monitoredObjectId = { type: decodedValue.objectType, instance: decodedValue.instance };
    value.cancellationRequest = true;
    value.issueConfirmedNotifications = false;
    if (baAsn1.decodeIsContextTag(buffer, offset + len, 2)) {
        value.cancellationRequest = false;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        value.issueConfirmedNotifications = buffer[offset + len] > 0;
        len++;
    }
    value.lifetime = 0;
    if (baAsn1.decodeIsContextTag(buffer, offset + len, 3)) {
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
        len += decodedValue.len;
        value.lifetime = decodedValue.value;
    }
    if (!baAsn1.decodeIsOpeningTagNumber(buffer, offset + len, 4))
        return;
    len++;
    value.monitoredProperty = {};
    if (!baAsn1.decodeIsContextTag(buffer, offset + len, 0))
        return;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeEnumerated(buffer, offset + len, result.value);
    len += decodedValue.len;
    value.monitoredProperty.id = decodedValue.value;
    value.monitoredProperty.index = baEnum.ASN1_ARRAY_ALL;
    if (baAsn1.decodeIsContextTag(buffer, offset + len, 1)) {
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
        len += decodedValue.len;
        value.monitoredProperty.index = decodedValue.value;
    }
    if (!baAsn1.decodeIsClosingTagNumber(buffer, offset + len, 4))
        return;
    len++;
    value.covIncrement = 0;
    if (baAsn1.decodeIsContextTag(buffer, offset + len, 5)) {
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        decodedValue = baAsn1.decodeReal(buffer, offset + len);
        len += decodedValue.len;
        value.covIncrement = decodedValue.value;
    }
    value.len = len;
    return value;
};
exports.decode = decode;

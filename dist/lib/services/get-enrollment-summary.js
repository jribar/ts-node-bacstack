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
exports.decodeAcknowledge = exports.encodeAcknowledge = exports.decode = exports.encode = void 0;
const baAsn1 = __importStar(require("../asn1"));
const baEnum = __importStar(require("../enum"));
const encode = (buffer, acknowledgmentFilter, enrollmentFilter, eventStateFilter, eventTypeFilter, priorityFilter, notificationClassFilter) => {
    baAsn1.encodeContextEnumerated(buffer, 0, acknowledgmentFilter);
    if (enrollmentFilter) {
        baAsn1.encodeOpeningTag(buffer, 1);
        baAsn1.encodeOpeningTag(buffer, 0);
        baAsn1.encodeContextObjectId(buffer, 0, enrollmentFilter.objectId.type, enrollmentFilter.objectId.instance);
        baAsn1.encodeClosingTag(buffer, 0);
        baAsn1.encodeContextUnsigned(buffer, 1, enrollmentFilter.processId);
        baAsn1.encodeClosingTag(buffer, 1);
    }
    if (eventStateFilter) {
        baAsn1.encodeOpeningTag(buffer, 2);
        baAsn1.encodeContextEnumerated(buffer, 0, eventStateFilter);
        baAsn1.encodeClosingTag(buffer, 2);
    }
    if (eventTypeFilter) {
        baAsn1.encodeOpeningTag(buffer, 3);
        baAsn1.encodeContextEnumerated(buffer, 0, eventTypeFilter);
        baAsn1.encodeClosingTag(buffer, 3);
    }
    if (priorityFilter) {
        baAsn1.encodeOpeningTag(buffer, 4);
        baAsn1.encodeContextUnsigned(buffer, 0, priorityFilter.min);
        baAsn1.encodeContextUnsigned(buffer, 1, priorityFilter.max);
        baAsn1.encodeClosingTag(buffer, 4);
    }
    if (notificationClassFilter) {
        baAsn1.encodeOpeningTag(buffer, 5);
        baAsn1.encodeContextUnsigned(buffer, 0, notificationClassFilter);
        baAsn1.encodeClosingTag(buffer, 5);
    }
};
exports.encode = encode;
const decode = (buffer, offset) => {
    let len = 0;
    let result;
    let decodedValue;
    const value = {};
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeEnumerated(buffer, offset + len, result.value);
    len += decodedValue.len;
    value.acknowledgmentFilter = decodedValue.value;
    if (baAsn1.decodeIsContextTag(buffer, offset + len, 1)) {
        len++;
        value.enrollmentFilter = {};
        if (!baAsn1.decodeIsContextTag(buffer, offset + len, 0))
            return;
        len++;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        decodedValue = baAsn1.decodeObjectId(buffer, offset + len);
        len += decodedValue.len;
        value.enrollmentFilter.objectId = { type: decodedValue.objectType, instance: decodedValue.instance };
        len++;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
        len += decodedValue.len;
        value.enrollmentFilter.processId = decodedValue.value;
        len++;
    }
    if (baAsn1.decodeIsContextTag(buffer, offset + len, 2)) {
        len++;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        decodedValue = baAsn1.decodeEnumerated(buffer, offset + len, result.value);
        len += decodedValue.len;
        value.eventStateFilter = decodedValue.value;
        len++;
    }
    if (baAsn1.decodeIsContextTag(buffer, offset + len, 3)) {
        len++;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        decodedValue = baAsn1.decodeEnumerated(buffer, offset + len, result.value);
        len += decodedValue.len;
        value.eventTypeFilter = decodedValue.value;
        len++;
    }
    if (baAsn1.decodeIsContextTag(buffer, offset + len, 4)) {
        len++;
        value.priorityFilter = {};
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
        len += decodedValue.len;
        value.priorityFilter.min = decodedValue.value;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
        len += decodedValue.len;
        value.priorityFilter.max = decodedValue.value;
        len++;
    }
    if (baAsn1.decodeIsContextTag(buffer, offset + len, 5)) {
        len++;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
        len += decodedValue.len;
        value.notificationClassFilter = decodedValue.value;
        len++;
    }
    value.len = len;
    return value;
};
exports.decode = decode;
const encodeAcknowledge = (buffer, enrollmentSummaries) => {
    enrollmentSummaries.forEach((enrollmentSummary) => {
        baAsn1.encodeApplicationObjectId(buffer, enrollmentSummary.objectId.type, enrollmentSummary.objectId.instance);
        baAsn1.encodeApplicationEnumerated(buffer, enrollmentSummary.eventType);
        baAsn1.encodeApplicationEnumerated(buffer, enrollmentSummary.eventState);
        baAsn1.encodeApplicationUnsigned(buffer, enrollmentSummary.priority);
        baAsn1.encodeApplicationUnsigned(buffer, enrollmentSummary.notificationClass);
    });
};
exports.encodeAcknowledge = encodeAcknowledge;
const decodeAcknowledge = (buffer, offset, apduLen) => {
    let len = 0;
    let result;
    const enrollmentSummaries = [];
    while ((apduLen - len) > 0) {
        const enrollmentSummary = {};
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.OBJECTIDENTIFIER)
            return;
        result = baAsn1.decodeObjectId(buffer, offset + len);
        len += result.len;
        enrollmentSummary.objectId = { type: result.objectType, instance: result.instance };
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.ENUMERATED)
            return;
        result = baAsn1.decodeEnumerated(buffer, offset + len, result.value);
        len += result.len;
        enrollmentSummary.eventType = result.value;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.ENUMERATED)
            return;
        result = baAsn1.decodeEnumerated(buffer, offset + len, result.value);
        len += result.len;
        enrollmentSummary.eventState = result.value;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.UNSIGNED_INTEGER)
            return;
        result = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
        len += result.len;
        enrollmentSummary.priority = result.value;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.UNSIGNED_INTEGER)
            return;
        result = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
        len += result.len;
        enrollmentSummary.notificationClass = result.value;
        enrollmentSummaries.push(enrollmentSummary);
    }
    return {
        enrollmentSummaries: enrollmentSummaries,
        len: len
    };
};
exports.decodeAcknowledge = decodeAcknowledge;

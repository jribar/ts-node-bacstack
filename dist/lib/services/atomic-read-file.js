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
const encode = (buffer, isStream, objectId, position, count) => {
    baAsn1.encodeApplicationObjectId(buffer, objectId.type, objectId.instance);
    if (isStream) {
        baAsn1.encodeOpeningTag(buffer, 0);
        baAsn1.encodeApplicationSigned(buffer, position);
        baAsn1.encodeApplicationUnsigned(buffer, count);
        baAsn1.encodeClosingTag(buffer, 0);
    }
    else {
        baAsn1.encodeOpeningTag(buffer, 1);
        baAsn1.encodeApplicationSigned(buffer, position);
        baAsn1.encodeApplicationUnsigned(buffer, count);
        baAsn1.encodeClosingTag(buffer, 1);
    }
};
exports.encode = encode;
const decode = (buffer, offset) => {
    let len = 0;
    let result;
    let decodedValue;
    let isStream = true;
    let objectId = {};
    let position = -1;
    let count = 0;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    if (result.tagNumber !== baEnum.ApplicationTags.OBJECTIDENTIFIER)
        return;
    decodedValue = baAsn1.decodeObjectId(buffer, offset + len);
    len += decodedValue.len;
    objectId = { type: decodedValue.objectType, instance: decodedValue.instance };
    if (baAsn1.decodeIsOpeningTagNumber(buffer, offset + len, 0)) {
        isStream = true;
        len++;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.SIGNED_INTEGER)
            return;
        decodedValue = baAsn1.decodeSigned(buffer, offset + len, result.value);
        len += decodedValue.len;
        position = decodedValue.value;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.UNSIGNED_INTEGER)
            return;
        decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
        len += decodedValue.len;
        count = decodedValue.value;
        if (!baAsn1.decodeIsClosingTagNumber(buffer, offset + len, 0))
            return;
        len++;
    }
    else if (baAsn1.decodeIsOpeningTagNumber(buffer, offset + len, 1)) {
        isStream = false;
        len++;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.SIGNED_INTEGER)
            return;
        decodedValue = baAsn1.decodeSigned(buffer, offset + len, result.value);
        len += decodedValue.len;
        position = decodedValue.value;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.UNSIGNED_INTEGER)
            return;
        decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
        len += decodedValue.len;
        count = decodedValue.value;
        if (!baAsn1.decodeIsClosingTagNumber(buffer, offset + len, 1))
            return;
        len++;
    }
    else {
        return;
    }
    return {
        len: len,
        isStream: isStream,
        objectId: objectId,
        position: position,
        count: count
    };
};
exports.decode = decode;
const encodeAcknowledge = (buffer, isStream, endOfFile, position, blockCount, blocks, counts) => {
    baAsn1.encodeApplicationBoolean(buffer, endOfFile);
    if (isStream) {
        baAsn1.encodeOpeningTag(buffer, 0);
        baAsn1.encodeApplicationSigned(buffer, position);
        baAsn1.encodeApplicationOctetString(buffer, blocks[0], 0, counts[0]);
        baAsn1.encodeClosingTag(buffer, 0);
    }
    else {
        baAsn1.encodeOpeningTag(buffer, 1);
        baAsn1.encodeApplicationSigned(buffer, position);
        baAsn1.encodeApplicationUnsigned(buffer, blockCount);
        for (let i = 0; i < blockCount; i++) {
            baAsn1.encodeApplicationOctetString(buffer, blocks[i], 0, counts[i]);
        }
        baAsn1.encodeClosingTag(buffer, 1);
    }
};
exports.encodeAcknowledge = encodeAcknowledge;
const decodeAcknowledge = (buffer, offset) => {
    let len = 0;
    let result;
    let decodedValue;
    let isStream;
    let position;
    let targetBuffer;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    if (result.tagNumber !== baEnum.ApplicationTags.BOOLEAN)
        return;
    const endOfFile = result.value > 0;
    if (baAsn1.decodeIsOpeningTagNumber(buffer, offset + len, 0)) {
        isStream = true;
        len++;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.SIGNED_INTEGER)
            return;
        decodedValue = baAsn1.decodeSigned(buffer, offset + len, result.value);
        len += decodedValue.len;
        position = decodedValue.value;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.OCTET_STRING)
            return;
        targetBuffer = buffer.slice(offset + len, offset + len + result.value);
        len += result.value;
        if (!baAsn1.decodeIsClosingTagNumber(buffer, offset + len, 0))
            return;
        len++;
    }
    else if (baAsn1.decodeIsOpeningTagNumber(buffer, offset + len, 1)) {
        isStream = false;
        throw new Error('NotImplemented');
    }
    else {
        return;
    }
    return {
        len: len,
        endOfFile: endOfFile,
        isStream: isStream,
        position: position,
        buffer: targetBuffer
    };
};
exports.decodeAcknowledge = decodeAcknowledge;

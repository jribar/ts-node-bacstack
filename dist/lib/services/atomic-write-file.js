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
const encode = (buffer, isStream, objectId, position, blocks) => {
    baAsn1.encodeApplicationObjectId(buffer, objectId.type, objectId.instance);
    if (isStream) {
        baAsn1.encodeOpeningTag(buffer, 0);
        baAsn1.encodeApplicationSigned(buffer, position);
        baAsn1.encodeApplicationOctetString(buffer, blocks[0], 0, blocks[0].length);
        baAsn1.encodeClosingTag(buffer, 0);
    }
    else {
        baAsn1.encodeOpeningTag(buffer, 1);
        baAsn1.encodeApplicationSigned(buffer, position);
        baAsn1.encodeApplicationUnsigned(buffer, blocks.length);
        for (let i = 0; i < blocks.length; i++) {
            baAsn1.encodeApplicationOctetString(buffer, blocks[i], 0, blocks[i].length);
        }
        baAsn1.encodeClosingTag(buffer, 1);
    }
};
exports.encode = encode;
const decode = (buffer, offset, apduLen) => {
    let len = 0;
    let result;
    let decodedValue;
    let isStream;
    let position;
    const blocks = [];
    let blockCount;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    if (result.tagNumber !== baEnum.ApplicationTags.OBJECTIDENTIFIER)
        return;
    decodedValue = baAsn1.decodeObjectId(buffer, offset + len);
    len += decodedValue.len;
    const objectId = { type: decodedValue.objectType, instance: decodedValue.instance };
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
        decodedValue = baAsn1.decodeOctetString(buffer, offset + len, apduLen, 0, result.value);
        len += decodedValue.len;
        blocks.push(decodedValue.value);
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
        blockCount = decodedValue.value;
        for (let i = 0; i < blockCount; i++) {
            result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
            len += result.len;
            if (result.tagNumber !== baEnum.ApplicationTags.OCTET_STRING)
                return;
            decodedValue = baAsn1.decodeOctetString(buffer, offset + len, apduLen, 0, result.value);
            len += decodedValue.len;
            blocks.push(decodedValue.value);
        }
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
        blocks: blocks
    };
};
exports.decode = decode;
const encodeAcknowledge = (buffer, isStream, position) => {
    if (isStream) {
        baAsn1.encodeContextSigned(buffer, 0, position);
    }
    else {
        baAsn1.encodeContextSigned(buffer, 1, position);
    }
};
exports.encodeAcknowledge = encodeAcknowledge;
const decodeAcknowledge = (buffer, offset) => {
    let len = 0;
    let isStream = false;
    let position = 0;
    const result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    if (result.tagNumber === 0) {
        isStream = true;
    }
    else if (result.tagNumber === 1) {
        isStream = false;
    }
    else {
        return;
    }
    const decodedValue = baAsn1.decodeSigned(buffer, offset + len, result.value);
    len += decodedValue.len;
    position = decodedValue.value;
    return {
        len: len,
        isStream: isStream,
        position: position
    };
};
exports.decodeAcknowledge = decodeAcknowledge;

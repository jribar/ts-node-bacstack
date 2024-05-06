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
exports.encodeObject = exports.decode = exports.encode = void 0;
const baAsn1 = __importStar(require("../asn1"));
const baEnum = __importStar(require("../enum"));
const encode = (buffer, objectId, values) => {
    baAsn1.encodeContextObjectId(buffer, 0, objectId.type, objectId.instance);
    baAsn1.encodeOpeningTag(buffer, 1);
    values.forEach((pValue) => {
        baAsn1.encodeContextEnumerated(buffer, 0, pValue.property.id);
        if (pValue.property.index !== baEnum.ASN1_ARRAY_ALL) {
            baAsn1.encodeContextUnsigned(buffer, 1, pValue.property.index);
        }
        baAsn1.encodeOpeningTag(buffer, 2);
        pValue.value.forEach((value) => baAsn1.bacappEncodeApplicationData(buffer, value));
        baAsn1.encodeClosingTag(buffer, 2);
        if (pValue.priority !== baEnum.ASN1_NO_PRIORITY) {
            baAsn1.encodeContextUnsigned(buffer, 3, pValue.priority);
        }
    });
    baAsn1.encodeClosingTag(buffer, 1);
};
exports.encode = encode;
const decode = (buffer, offset, apduLen) => {
    let len = 0;
    let result;
    let decodedValue;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    if ((result.tagNumber !== 0) || (apduLen <= len))
        return;
    apduLen -= len;
    if (apduLen < 4)
        return;
    decodedValue = baAsn1.decodeObjectId(buffer, offset + len);
    len += decodedValue.len;
    const objectId = {
        type: decodedValue.objectType,
        instance: decodedValue.instance
    };
    if (!baAsn1.decodeIsOpeningTagNumber(buffer, offset + len, 1))
        return;
    len++;
    const _values = [];
    while ((apduLen - len) > 1) {
        const newEntry = {};
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        if (result.tagNumber !== 0)
            return;
        decodedValue = baAsn1.decodeEnumerated(buffer, offset + len, result.value);
        len += decodedValue.len;
        const propertyId = decodedValue.value;
        let arrayIndex = baEnum.ASN1_ARRAY_ALL;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        if (result.tagNumber === 1) {
            decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
            len += decodedValue.len;
            arrayIndex = decodedValue.value;
            result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
            len += result.len;
        }
        newEntry.property = { id: propertyId, index: arrayIndex };
        if ((result.tagNumber !== 2) || (!baAsn1.decodeIsOpeningTag(buffer, offset + len - 1)))
            return;
        const values = [];
        while ((len + offset) <= buffer.length && !baAsn1.decodeIsClosingTag(buffer, offset + len)) {
            const value = baAsn1.bacappDecodeApplicationData(buffer, offset + len, apduLen + offset, objectId.type, propertyId);
            if (!value)
                return;
            len += value.len;
            delete value.len;
            values.push(value);
        }
        len++;
        newEntry.value = values;
        let priority = baEnum.ASN1_NO_PRIORITY;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        if (result.tagNumber === 3) {
            decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
            len += decodedValue.len;
            priority = decodedValue.value;
        }
        else {
            len--;
        }
        newEntry.priority = priority;
        _values.push(newEntry);
    }
    if (!baAsn1.decodeIsClosingTagNumber(buffer, offset + len, 1))
        return;
    len++;
    return {
        len: len,
        objectId: objectId,
        values: _values
    };
};
exports.decode = decode;
const encodeObject = (buffer, values) => {
    values.forEach((object) => (0, exports.encode)(buffer, object.objectId, object.values));
};
exports.encodeObject = encodeObject;

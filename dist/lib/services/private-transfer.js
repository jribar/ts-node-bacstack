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
const encode = (buffer, vendorId, serviceNumber, data) => {
    baAsn1.encodeContextUnsigned(buffer, 0, vendorId);
    baAsn1.encodeContextUnsigned(buffer, 1, serviceNumber);
    baAsn1.encodeOpeningTag(buffer, 2);
    for (let i = 0; i < data.length; i++) {
        buffer.buffer[buffer.offset++] = data[i];
    }
    baAsn1.encodeClosingTag(buffer, 2);
};
exports.encode = encode;
const decode = (buffer, offset, apduLen) => {
    let len = 0;
    let result;
    let decodedValue;
    const value = {};
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
    len += decodedValue.len;
    value.vendorId = decodedValue.value;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
    len += decodedValue.len;
    value.serviceNumber = decodedValue.value;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    const size = apduLen - (offset + len + 1);
    const data = [];
    for (let i = 0; i < size; i++) {
        data.push(buffer[offset + len++]);
    }
    value.data = data;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    value.len = len;
    return value;
};
exports.decode = decode;

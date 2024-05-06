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
const encode = (buffer, properties) => {
    properties.forEach((value) => baAsn1.encodeReadAccessSpecification(buffer, value));
};
exports.encode = encode;
const decode = (buffer, offset, apduLen) => {
    let len = 0;
    const values = [];
    while ((apduLen - len) > 0) {
        const decodedValue = baAsn1.decodeReadAccessSpecification(buffer, offset + len, apduLen - len);
        if (!decodedValue)
            return;
        len += decodedValue.len;
        values.push(decodedValue.value);
    }
    return {
        len: len,
        properties: values
    };
};
exports.decode = decode;
const encodeAcknowledge = (buffer, values) => {
    values.forEach((value) => baAsn1.encodeReadAccessResult(buffer, value));
};
exports.encodeAcknowledge = encodeAcknowledge;
const decodeAcknowledge = (buffer, offset, apduLen) => {
    let len = 0;
    const values = [];
    while ((apduLen - len) > 0) {
        const result = baAsn1.decodeReadAccessResult(buffer, offset + len, apduLen - len);
        if (!result)
            return;
        len += result.len;
        values.push(result.value);
    }
    return {
        len: len,
        values: values
    };
};
exports.decodeAcknowledge = decodeAcknowledge;

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
const encode = (buffer, errorClass, errorCode) => {
    baAsn1.encodeApplicationEnumerated(buffer, errorClass);
    baAsn1.encodeApplicationEnumerated(buffer, errorCode);
};
exports.encode = encode;
const decode = (buffer, offset) => {
    const orgOffset = offset;
    let result;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset);
    offset += result.len;
    const errorClass = baAsn1.decodeEnumerated(buffer, offset, result.value);
    offset += errorClass.len;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset);
    offset += result.len;
    const errorCode = baAsn1.decodeEnumerated(buffer, offset, result.value);
    offset += errorClass.len;
    return {
        len: offset - orgOffset,
        class: errorClass.value,
        code: errorCode.value
    };
};
exports.decode = decode;

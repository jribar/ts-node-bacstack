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
const encode = (buffer, timeDuration, enableDisable, password) => {
    if (timeDuration > 0) {
        baAsn1.encodeContextUnsigned(buffer, 0, timeDuration);
    }
    baAsn1.encodeContextEnumerated(buffer, 1, enableDisable);
    if (password && password !== '') {
        baAsn1.encodeContextCharacterString(buffer, 2, password);
    }
};
exports.encode = encode;
const decode = (buffer, offset, apduLen) => {
    let len = 0;
    const value = {};
    let decodedValue;
    let result;
    if (baAsn1.decodeIsContextTag(buffer, offset + len, 0)) {
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        decodedValue = baAsn1.decodeUnsigned(buffer, offset + len, result.value);
        value.timeDuration = decodedValue.value;
        len += decodedValue.len;
    }
    if (!baAsn1.decodeIsContextTag(buffer, offset + len, 1))
        return;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    decodedValue = baAsn1.decodeEnumerated(buffer, offset + len, result.value);
    value.enableDisable = decodedValue.value;
    len += decodedValue.len;
    if (len < apduLen) {
        if (!baAsn1.decodeIsContextTag(buffer, offset + len, 2))
            return;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
        len += result.len;
        decodedValue = baAsn1.decodeCharacterString(buffer, offset + len, apduLen - (offset + len), result.value);
        value.password = decodedValue.value;
        len += decodedValue.len;
    }
    value.len = len;
    return value;
};
exports.decode = decode;

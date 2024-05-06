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
const encode = (buffer, time) => {
    baAsn1.encodeApplicationDate(buffer, time);
    baAsn1.encodeApplicationTime(buffer, time);
};
exports.encode = encode;
const decode = (buffer, offset) => {
    let len = 0;
    let result;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    if (result.tagNumber !== baEnum.ApplicationTags.DATE)
        return;
    const date = baAsn1.decodeDate(buffer, offset + len);
    len += date.len;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + len);
    len += result.len;
    if (result.tagNumber !== baEnum.ApplicationTags.TIME)
        return;
    const time = baAsn1.decodeBacnetTime(buffer, offset + len);
    len += time.len;
    return {
        len: len,
        value: new Date(date.value.getFullYear(), date.value.getMonth(), date.value.getDate(), time.value.getHours(), time.value.getMinutes(), time.value.getSeconds(), time.value.getMilliseconds())
    };
};
exports.decode = decode;

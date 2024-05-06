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
const encode = (buffer, deviceId, maxApdu, segmentation, vendorId) => {
    baAsn1.encodeApplicationObjectId(buffer, baEnum.ObjectType.DEVICE, deviceId);
    baAsn1.encodeApplicationUnsigned(buffer, maxApdu);
    baAsn1.encodeApplicationEnumerated(buffer, segmentation);
    baAsn1.encodeApplicationUnsigned(buffer, vendorId);
};
exports.encode = encode;
const decode = (buffer, offset) => {
    let result;
    let apduLen = 0;
    const orgOffset = offset;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + apduLen);
    apduLen += result.len;
    if (result.tagNumber !== baEnum.ApplicationTags.OBJECTIDENTIFIER)
        return;
    result = baAsn1.decodeObjectId(buffer, offset + apduLen);
    apduLen += result.len;
    if (result.objectType !== baEnum.ObjectType.DEVICE)
        return;
    const deviceId = result.instance;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + apduLen);
    apduLen += result.len;
    if (result.tagNumber !== baEnum.ApplicationTags.UNSIGNED_INTEGER)
        return;
    result = baAsn1.decodeUnsigned(buffer, offset + apduLen, result.value);
    apduLen += result.len;
    const maxApdu = result.value;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + apduLen);
    apduLen += result.len;
    if (result.tagNumber !== baEnum.ApplicationTags.ENUMERATED)
        return;
    result = baAsn1.decodeEnumerated(buffer, offset + apduLen, result.value);
    apduLen += result.len;
    if (result.value > baEnum.Segmentation.NO_SEGMENTATION)
        return;
    const segmentation = result.value;
    result = baAsn1.decodeTagNumberAndValue(buffer, offset + apduLen);
    apduLen += result.len;
    if (result.tagNumber !== baEnum.ApplicationTags.UNSIGNED_INTEGER)
        return;
    result = baAsn1.decodeUnsigned(buffer, offset + apduLen, result.value);
    apduLen += result.len;
    if (result.value > 0xFFFF)
        return;
    const vendorId = result.value;
    return {
        len: offset - orgOffset,
        deviceId: deviceId,
        maxApdu: maxApdu,
        segmentation: segmentation,
        vendorId: vendorId
    };
};
exports.decode = decode;

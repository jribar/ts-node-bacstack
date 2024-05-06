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
const baEnum = __importStar(require("./enum"));
const encode = (buffer, func, msgLength) => {
    buffer[0] = baEnum.BVLL_TYPE_BACNET_IP;
    buffer[1] = func;
    buffer[2] = (msgLength & 0xFF00) >> 8;
    buffer[3] = (msgLength & 0x00FF) >> 0;
    return baEnum.BVLC_HEADER_LENGTH;
};
exports.encode = encode;
const decode = (buffer, offset) => {
    let len;
    const func = buffer[1];
    const msgLength = (buffer[2] << 8) | (buffer[3] << 0);
    if (buffer[0] !== baEnum.BVLL_TYPE_BACNET_IP || buffer.length !== msgLength)
        return;
    switch (func) {
        case baEnum.BvlcResultPurpose.BVLC_RESULT:
        case baEnum.BvlcResultPurpose.ORIGINAL_UNICAST_NPDU:
        case baEnum.BvlcResultPurpose.ORIGINAL_BROADCAST_NPDU:
        case baEnum.BvlcResultPurpose.DISTRIBUTE_BROADCAST_TO_NETWORK:
            len = 4;
            break;
        case baEnum.BvlcResultPurpose.FORWARDED_NPDU:
            len = 10;
            break;
        case baEnum.BvlcResultPurpose.REGISTER_FOREIGN_DEVICE:
        case baEnum.BvlcResultPurpose.READ_FOREIGN_DEVICE_TABLE:
        case baEnum.BvlcResultPurpose.DELETE_FOREIGN_DEVICE_TABLE_ENTRY:
        case baEnum.BvlcResultPurpose.READ_BROADCAST_DISTRIBUTION_TABLE:
        case baEnum.BvlcResultPurpose.WRITE_BROADCAST_DISTRIBUTION_TABLE:
        case baEnum.BvlcResultPurpose.READ_BROADCAST_DISTRIBUTION_TABLE_ACK:
        case baEnum.BvlcResultPurpose.READ_FOREIGN_DEVICE_TABLE_ACK:
        case baEnum.BvlcResultPurpose.SECURE_BVLL:
            return;
        default:
            return;
    }
    return {
        len: len,
        func: func,
        msgLength: msgLength
    };
};
exports.decode = decode;

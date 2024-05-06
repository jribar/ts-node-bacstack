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
exports.encode = exports.decode = exports.decodeFunction = void 0;
const baEnum = __importStar(require("./enum"));
const BACNET_PROTOCOL_VERSION = 1;
const BacnetAddressTypes = {
    NONE: 0,
    IP: 1
};
const decodeTarget = (buffer, offset) => {
    let len = 0;
    const target = { type: BacnetAddressTypes.NONE, net: (buffer[offset + len++] << 8) | (buffer[offset + len++] << 0) };
    const adrLen = buffer[offset + len++];
    if (adrLen > 0) {
        target.adr = [];
        for (let i = 0; i < adrLen; i++) {
            target.adr.push(buffer[offset + len++]);
        }
    }
    return {
        target: target,
        len: len
    };
};
const encodeTarget = (buffer, target) => {
    buffer.buffer[buffer.offset++] = (target.net & 0xFF00) >> 8;
    buffer.buffer[buffer.offset++] = (target.net & 0x00FF) >> 0;
    if (target.net === 0xFFFF || !target.adr) {
        buffer.buffer[buffer.offset++] = 0;
    }
    else {
        buffer.buffer[buffer.offset++] = target.adr.length;
        if (target.adr.length > 0) {
            for (let i = 0; i < target.adr.length; i++) {
                buffer.buffer[buffer.offset++] = target.adr[i];
            }
        }
    }
};
const decodeFunction = (buffer, offset) => {
    if (buffer[offset + 0] !== BACNET_PROTOCOL_VERSION)
        return;
    return buffer[offset + 1];
};
exports.decodeFunction = decodeFunction;
const decode = (buffer, offset) => {
    const orgOffset = offset;
    offset++;
    const funct = buffer[offset++];
    let destination;
    if (funct & baEnum.NpduControlBits.DESTINATION_SPECIFIED) {
        const tmpDestination = decodeTarget(buffer, offset);
        offset += tmpDestination.len;
        destination = tmpDestination.target;
    }
    let source;
    if (funct & baEnum.NpduControlBits.SOURCE_SPECIFIED) {
        const tmpSource = decodeTarget(buffer, offset);
        offset += tmpSource.len;
        source = tmpSource.target;
    }
    let hopCount = 0;
    if (funct & baEnum.NpduControlBits.DESTINATION_SPECIFIED) {
        hopCount = buffer[offset++];
    }
    let networkMsgType = baEnum.NetworkLayerMessageType.WHO_IS_ROUTER_TO_NETWORK;
    let vendorId = 0;
    if (funct & baEnum.NpduControlBits.NETWORK_LAYER_MESSAGE) {
        networkMsgType = buffer[offset++];
        if (networkMsgType >= 0x80) {
            vendorId = (buffer[offset++] << 8) | (buffer[offset++] << 0);
        }
        else if (networkMsgType === baEnum.NetworkLayerMessageType.WHO_IS_ROUTER_TO_NETWORK) {
            offset += 2;
        }
    }
    if (buffer[orgOffset + 0] !== BACNET_PROTOCOL_VERSION)
        return;
    return {
        len: offset - orgOffset,
        funct: funct,
        destination: destination,
        source: source,
        hopCount: hopCount,
        networkMsgType: networkMsgType,
        vendorId: vendorId
    };
};
exports.decode = decode;
const encode = (buffer, funct, destination, source, hopCount, networkMsgType, vendorId) => {
    const hasDestination = destination && destination.net > 0;
    const hasSource = source && source.net > 0 && source.net !== 0xFFFF;
    buffer.buffer[buffer.offset++] = BACNET_PROTOCOL_VERSION;
    buffer.buffer[buffer.offset++] = funct | (hasDestination ? baEnum.NpduControlBits.DESTINATION_SPECIFIED : 0) | (hasSource ? baEnum.NpduControlBits.SOURCE_SPECIFIED : 0);
    if (hasDestination) {
        encodeTarget(buffer, destination);
    }
    if (hasSource) {
        encodeTarget(buffer, source);
    }
    if (hasDestination) {
        buffer.buffer[buffer.offset++] = hopCount;
    }
    if ((funct & baEnum.NpduControlBits.NETWORK_LAYER_MESSAGE) > 0) {
        buffer.buffer[buffer.offset++] = networkMsgType;
        if (networkMsgType >= 0x80) {
            buffer.buffer[buffer.offset++] = (vendorId & 0xFF00) >> 8;
            buffer.buffer[buffer.offset++] = (vendorId & 0x00FF) >> 0;
        }
    }
};
exports.encode = encode;

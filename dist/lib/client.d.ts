/// <reference types="node" />
import { EventEmitter } from 'events';
import { BACNetObjectID, BACNetPropertyID, BACNetAppData } from './types';
/**
 * To be able to communicate to BACNET devices, you have to initialize a new bacstack instance.
 * @class bacstack
 * @param {object=} this._settings - The options object used for parameterizing the bacstack.
 * @param {number=} [options.port=47808] - BACNET communication port for listening and sending.
 * @param {string=} options.interface - Specific BACNET communication interface if different from primary one.
 * @param {string=} [options.broadcastAddress=255.255.255.255] - The address used for broadcast messages.
 * @param {number=} [options.apduTimeout=3000] - The timeout in milliseconds until a transaction should be interpreted as error.
 * @example
 * const bacnet = require('bacstack');
 *
 * const client = new bacnet({
 *   port: 47809,                          // Use BAC1 as communication port
 *   interface: '192.168.251.10',          // Listen on a specific interface
 *   broadcastAddress: '192.168.251.255',  // Use the subnet broadcast address
 *   apduTimeout: 6000                     // Wait twice as long for response
 * });
 */
export declare class Client extends EventEmitter {
    private _settings;
    private _transport;
    private _invokeCounter;
    private _invokeStore;
    private _lastSequenceNumber;
    private _segmentStore;
    constructor(options?: any);
    private _getInvokeId;
    private _invokeCallback;
    private _addCallback;
    private _getBuffer;
    private _processError;
    private _processAbort;
    private _segmentAckResponse;
    private _performDefaultSegmentHandling;
    private _processSegment;
    private _processConfirmedServiceRequest;
    private _processUnconfirmedServiceRequest;
    private _handlePdu;
    private _handleNpdu;
    private _receiveData;
    private _receiveError;
    /**
     * The whoIs command discovers all BACNET devices in a network.
     * @function bacstack.whoIs
     * @param {object=} options
     * @param {number=} options.lowLimit - Minimal device instance number to search for.
     * @param {number=} options.highLimit - Maximal device instance number to search for.
     * @param {string=} options.address - Unicast address if command should address a device directly.
     * @fires bacstack.iAm
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.whoIs();
     */
    whoIs(options?: {
        lowLimit?: number;
        highLimit?: number;
        address?: string;
    }): void;
    /**
     * The timeSync command sets the time of a target device.
     * @function bacstack.timeSync
     * @param {string} address - IP address of the target device.
     * @param {date} dateTime - The date and time to set on the target device.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.timeSync('192.168.1.43', new Date());
     */
    timeSync(address: string, dateTime: Date): void;
    /**
     * The timeSyncUTC command sets the UTC time of a target device.
     * @function bacstack.timeSyncUTC
     * @param {string} address - IP address of the target device.
     * @param {date} dateTime - The date and time to set on the target device.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.timeSyncUTC('192.168.1.43', new Date());
     */
    timeSyncUTC(address: string, dateTime: Date): void;
    /**
     * The readProperty command reads a single property of an object from a device.
     * @function bacstack.readProperty
     * @param {string} address - IP address of the target device.
     * @param {object} objectId - The BACNET object ID to read.
     * @param {number} objectId.type - The BACNET object type to read.
     * @param {number} objectId.instance - The BACNET object instance to read.
     * @param {number} propertyId - The BACNET property id in the specified object to read.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {number=} options.arrayIndex - The array index of the property to be read.
     * @param {function} next - The callback containing an error, in case of a failure and value object in case of success.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.readProperty('192.168.1.43', {type: 8, instance: 44301}, 28, (err, value) => {
     *   console.log('value: ', value);
     * });
     */
    readProperty(address: string, objectId: BACNetObjectID, propertyId: number, options: any, next: (err?: Error, result?: any) => void): void;
    /**
     * The writeProperty command writes a single property of an object to a device.
     * @function bacstack.writeProperty
     * @param {string} address - IP address of the target device.
     * @param {object} objectId - The BACNET object ID to write.
     * @param {number} objectId.type - The BACNET object type to write.
     * @param {number} objectId.instance - The BACNET object instance to write.
     * @param {number} propertyId - The BACNET property id in the specified object to write.
     * @param {object[]} values - A list of values to be written to the specified property.
     * @param {ApplicationTags} values.tag - The data-type of the value to be written.
     * @param {number} values.value - The actual value to be written.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {number=} options.arrayIndex - The array index of the property to be read.
     * @param {number=} options.priority - The priority of the value to be written.
     * @param {function} next - The callback containing an error, in case of a failure.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.writeProperty('192.168.1.43', {type: 8, instance: 44301}, 28, [
     *   {type: bacnet.enum.ApplicationTags.REAL, value: 100}
     * ], (err) => {
     *   console.log('error: ', err);
     * });
     */
    writeProperty(address: string, objectId: BACNetObjectID, propertyId: number, values: BACNetAppData[], options: any, next: (err?: Error) => void): void;
    /**
     * The readPropertyMultiple command reads multiple properties in multiple objects from a device.
     * @function bacstack.readPropertyMultiple
     * @param {string} address - IP address of the target device.
     * @param {object[]} propertiesArray - List of object and property specifications to be read.
     * @param {object} propertiesArray.objectId - Specifies which object to read.
     * @param {number} propertiesArray.objectId.type - The BACNET object type to read.
     * @param {number} propertiesArray.objectId.instance - The BACNET object instance to read.
     * @param {object[]} propertiesArray.properties - List of properties to be read.
     * @param {number} propertiesArray.properties.id - The BACNET property id in the specified object to read. Also supports 8 for all properties.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {function} next - The callback containing an error, in case of a failure and value object in case of success.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * const propertiesArray = [
     *   {objectId: {type: 8, instance: 4194303}, properties: [{id: 8}]}
     * ];
     * client.readPropertyMultiple('192.168.1.43', propertiesArray, (err, value) => {
     *   console.log('value: ', value);
     * });
     */
    readPropertyMultiple(address: string, propertiesArray: any[], options: any, next: (err?: Error, result?: any) => void): void;
    /**
     * The writePropertyMultiple command writes multiple properties in multiple objects to a device.
     * @function bacstack.writePropertyMultiple
     * @param {string} address - IP address of the target device.
     * @param {object[]} values - List of object and property specifications to be written.
     * @param {object} values.objectId - Specifies which object to read.
     * @param {number} values.objectId.type - The BACNET object type to read.
     * @param {number} values.objectId.instance - The BACNET object instance to read.
     * @param {object[]} values.values - List of properties to be written.
     * @param {object} values.values.property - Property specifications to be written.
     * @param {number} values.values.property.id - The BACNET property id in the specified object to write.
     * @param {number} values.values.property.index - The array index of the property to be written.
     * @param {object[]} values.values.value - A list of values to be written to the specified property.
     * @param {ApplicationTags} values.values.value.tag - The data-type of the value to be written.
     * @param {object} values.values.value.value - The actual value to be written.
     * @param {number} values.values.priority - The priority to be used for writing to the property.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {function} next - The callback containing an error, in case of a failure.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * const values = [
     *   {objectId: {type: 8, instance: 44301}, values: [
     *     {property: {id: 28, index: 12}, value: [{type: bacnet.enum.ApplicationTags.BOOLEAN, value: true}], priority: 8}
     *   ]}
     * ];
     * client.writePropertyMultiple('192.168.1.43', values, (err) => {
     *   console.log('error: ', err);
     * });
     */
    writePropertyMultiple(address: string, values: any[], options: any, next: (err?: Error) => void): void;
    /**
     * The deviceCommunicationControl command enables or disables network communication of the target device.
     * @function bacstack.deviceCommunicationControl
     * @param {string} address - IP address of the target device.
     * @param {number} timeDuration - The time to hold the network communication state in seconds. 0 for infinite.
     * @param {EnableDisable} enableDisable - The network communication state to set.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {string=} options.password - The optional password used to set the network communication state.
     * @param {function} next - The callback containing an error, in case of a failure.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.deviceCommunicationControl('192.168.1.43', 0, bacnet.enum.EnableDisable.DISABLE, (err) => {
     *   console.log('error: ', err);
     * });
     */
    deviceCommunicationControl(address: string, timeDuration: number, enableDisable: number, options: any, next: (err?: Error) => void): void;
    /**
     * The reinitializeDevice command initiates a restart of the target device.
     * @function bacstack.reinitializeDevice
     * @param {string} address - IP address of the target device.
     * @param {ReinitializedState} state - The type of restart to be initiated.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {string=} options.password - The optional password used to restart the device.
     * @param {function} next - The callback containing an error, in case of a failure.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.reinitializeDevice('192.168.1.43', bacnet.enum.ReinitializedState.COLDSTART, (err) => {
     *   console.log('error: ', err);
     * });
     */
    reinitializeDevice(address: string, state: number, options: any, next: (err?: Error) => void): void;
    /**
     * The writeFile command writes a file buffer to a specific position of a file object.
     * @function bacstack.writeFile
     * @param {string} address - IP address of the target device.
     * @param {object} objectId - The BACNET object ID representing the file object.
     * @param {number} objectId.type - The BACNET object type representing the file object.
     * @param {number} objectId.instance - The BACNET object instance representing the file object.
     * @param {number} position - The position in the file to write at.
     * @param {Array.<number[]>} fileBuffer - The content to be written to the file.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {function} next - The callback containing an error, in case of a failure and value object in case of success.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.writeFile('192.168.1.43', {type: 8, instance: 44301}, 0, [[5, 6, 7, 8], [5, 6, 7, 8]], (err, value) => {
     *   console.log('value: ', value);
     * });
     */
    writeFile(address: string, objectId: BACNetObjectID, position: number, fileBuffer: number[][], options: any, next: (err?: Error, result?: any) => void): void;
    /**
     * The readFile command reads a number of bytes at a specific position of a file object.
     * @function bacstack.readFile
     * @param {string} address - IP address of the target device.
     * @param {object} objectId - The BACNET object ID representing the file object.
     * @param {number} objectId.type - The BACNET object type representing the file object.
     * @param {number} objectId.instance - The BACNET object instance representing the file object.
     * @param {number} position - The position in the file to read at.
     * @param {number} count - The number of octets to read.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {function} next - The callback containing an error, in case of a failure and value object in case of success.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.readFile('192.168.1.43', {type: 8, instance: 44301}, 0, 100, (err, value) => {
     *   console.log('value: ', value);
     * });
     */
    readFile(address: string, objectId: BACNetObjectID, position: number, count: number, options: any, next: (err?: Error, result?: any) => void): void;
    /**
     * The readRange command reads a number if list items of an array or list object.
     * @function bacstack.readRange
     * @param {string} address - IP address of the target device.
     * @param {object} objectId - The BACNET object ID to read.
     * @param {number} objectId.type - The BACNET object type to read.
     * @param {number} objectId.instance - The BACNET object instance to read.
     * @param {number} idxBegin - The index of the first/last item to read.
     * @param {number} quantity - The number of records to read.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {function} next - The callback containing an error, in case of a failure and value object in case of success.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.readRange('192.168.1.43', {type: 8, instance: 44301}, 0, 200, (err, value) => {
     *   console.log('value: ', value);
     * });
     */
    readRange(address: string, objectId: BACNetObjectID, idxBegin: number, quantity: number, options: any, next: (err?: Error, result?: any) => void): void;
    /**
     * The subscribeCOV command subscribes to an object for "Change of Value" notifications.
     * @function bacstack.subscribeCOV
     * @param {string} address - IP address of the target device.
     * @param {object} objectId - The BACNET object ID to subscribe for.
     * @param {number} objectId.type - The BACNET object type to subscribe for.
     * @param {number} objectId.instance - The BACNET object instance to subscribe for.
     * @param {number} subscribeId - A unique identifier to map the subscription.
     * @param {boolean} cancel - Cancel an existing subscription instead of creating a new one.
     * @param {boolean} issueConfirmedNotifications - Identifies if unconfirmed/confirmed notifications shall be returned.
     * @param {number} lifetime - Number of seconds for the subscription to stay active, 0 for infinite.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {function} next - The callback containing an error, in case of a failure.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.subscribeCOV('192.168.1.43', {type: 8, instance: 44301}, 7, false, false, 0, (err) => {
     *   console.log('error: ', err);
     * });
     */
    subscribeCOV(address: string, objectId: BACNetObjectID, subscribeId: number, cancel: boolean, issueConfirmedNotifications: boolean, lifetime: number, options: any, next: (err?: Error) => void): void;
    /**
     * The subscribeProperty command subscribes to a specific property of an object for "Change of Value" notifications.
     * @function bacstack.subscribeProperty
     * @param {string} address - IP address of the target device.
     * @param {object} objectId - The BACNET object ID to subscribe for.
     * @param {number} objectId.type - The BACNET object type to subscribe for.
     * @param {number} objectId.instance - The BACNET object instance to subscribe for.
     * @param {object} monitoredProperty
     * @param {object} monitoredProperty.id - The property ID to subscribe for.
     * @param {object} monitoredProperty.index - The property index to subscribe for.
     * @param {number} subscribeId - A unique identifier to map the subscription.
     * @param {boolean} cancel - Cancel an existing subscription instead of creating a new one.
     * @param {boolean} issueConfirmedNotifications - Identifies if unconfirmed/confirmed notifications shall be returned.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {function} next - The callback containing an error, in case of a failure.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.subscribeProperty('192.168.1.43', {type: 8, instance: 44301}, {id: 80, index: 0}, 8, false, false, (err) => {
     *   console.log('error: ', err);
     * });
     */
    subscribeProperty(address: string, objectId: BACNetObjectID, monitoredProperty: BACNetPropertyID, subscribeId: number, cancel: boolean, issueConfirmedNotifications: boolean, options: any, next: (err?: Error) => void): void;
    createObject(address: string, objectId: BACNetObjectID, values: any, options: any, next: (err?: Error) => void): void;
    /**
     * The deleteObject command removes an object instance from a target device.
     * @function bacstack.deleteObject
     * @param {string} address - IP address of the target device.
     * @param {object} objectId - The BACNET object ID to delete.
     * @param {number} objectId.type - The BACNET object type to delete.
     * @param {number} objectId.instance - The BACNET object instance to delete.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {function} next - The callback containing an error, in case of a failure.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.deleteObject('192.168.1.43', {type: 8, instance: 44301}, (err) => {
     *   console.log('error: ', err);
     * });
     */
    deleteObject(address: string, objectId: BACNetObjectID, options: any, next: (err?: Error) => void): void;
    removeListElement(address: string, objectId: BACNetObjectID, reference: BACNetPropertyID, values: any, options: any, next: (err?: Error) => void): void;
    addListElement(address: string, objectId: BACNetObjectID, reference: BACNetPropertyID, values: any, options: any, next: (err?: Error) => void): void;
    /**
     * DEPRECATED The getAlarmSummary command returns a list of all active alarms on the target device.
     * @function bacstack.getAlarmSummary
     * @param {string} address - IP address of the target device.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {function} next - The callback containing an error, in case of a failure and value object in case of success.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.getAlarmSummary('192.168.1.43', (err, value) => {
     *   console.log('value: ', value);
     * });
     */
    getAlarmSummary(address: string, options: any, next: (err?: Error, result?: any) => void): void;
    /**
     * The getEventInformation command returns a list of all active event states on the target device.
     * @function bacstack.getEventInformation
     * @param {string} address - IP address of the target device.
     * @param {object=} objectId - The optional BACNET object ID to continue preceding calls.
     * @param {number=} objectId.type - The optional BACNET object type to continue preceding calls.
     * @param {number=} objectId.instance - The optional BACNET object instance to continue preceding calls.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {function} next - The callback containing an error, in case of a failure and value object in case of success.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.getEventInformation('192.168.1.43', {}, (err, value) => {
     *   console.log('value: ', value);
     * });
     */
    getEventInformation(address: string, objectId: BACNetObjectID, options: any, next: (err?: Error, result?: any) => void): void;
    acknowledgeAlarm(address: string, objectId: BACNetObjectID, eventState: number, ackText: string, evTimeStamp: any, ackTimeStamp: any, options: any, next: (err?: Error) => void): void;
    /**
     * The confirmedPrivateTransfer command invokes a confirmed proprietary/non-standard service.
     * @function bacstack.confirmedPrivateTransfer
     * @param {string} address - IP address of the target device.
     * @param {number} vendorId - The unique vendor identification code.
     * @param {number} serviceNumber - The unique service identifier.
     * @param {number[]} [data] - Optional additional payload data.
     * @param {object=} options
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {function} next - The callback containing an error, in case of a failure.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.confirmedPrivateTransfer('192.168.1.43', 0, 7, [0x00, 0xaa, 0xfa, 0xb1, 0x00], (err) => {
     *   console.log('error: ', err);
     * });
     */
    confirmedPrivateTransfer(address: string, vendorId: number, serviceNumber: number, data: number[], options: any, next: (err?: Error) => void): void;
    /**
     * The unconfirmedPrivateTransfer command invokes an unconfirmed proprietary/non-standard service.
     * @function bacstack.unconfirmedPrivateTransfer
     * @param {string} address - IP address of the target device.
     * @param {number} vendorId - The unique vendor identification code.
     * @param {number} serviceNumber - The unique service identifier.
     * @param {number[]} [data] - Optional additional payload data.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.unconfirmedPrivateTransfer('192.168.1.43', 0, 7, [0x00, 0xaa, 0xfa, 0xb1, 0x00]);
     */
    unconfirmedPrivateTransfer(address: string, vendorId: number, serviceNumber: number, data: number[]): void;
    /**
     * DEPRECATED The getEnrollmentSummary command returns a list of event-initiating objects on the target device.
     * @function bacstack.getEnrollmentSummary
     * @param {string} address - IP address of the target device.
     * @param {number} acknowledgmentFilter - Filter for ALL/ACKED/NOT-ACKED, 0/1/2.
     * @param {object=} options
     * @param {object=} options.enrollmentFilter - Filter for enrollment.
     * @param {EventState=} options.eventStateFilter - Filter for event state.
     * @param {EventType=} options.eventTypeFilter - Filter for event type.
     * @param {object=} options.priorityFilter
     * @param {number} options.priorityFilter.min - Filter for minimal priority
     * @param {number} options.priorityFilter.max - Filter for maximal priority
     * @param {number=} options.notificationClassFilter - Filter for notification class.
     * @param {MaxSegmentsAccepted=} options.maxSegments - The maximimal allowed number of segments.
     * @param {MaxApduLengthAccepted=} options.maxApdu - The maximal allowed APDU size.
     * @param {number=} options.invokeId - The invoke ID of the confirmed service telegram.
     * @param {function} next - The callback containing an error, in case of a failure and value object in case of success.
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.getEnrollmentSummary('192.168.1.43', 0, (err, value) => {
     *   console.log('value: ', value);
     * });
     */
    getEnrollmentSummary(address: string, acknowledgmentFilter: number, options: any, next: (err?: Error, result?: any) => void): void;
    unconfirmedEventNotification(address: string, eventNotification: any): void;
    confirmedEventNotification(address: string, eventNotification: any, options: any, next: (err?: Error) => void): void;
    readPropertyResponse(receiver: string, invokeId: number, objectId: BACNetObjectID, property: BACNetPropertyID, value: any[]): void;
    readPropertyMultipleResponse(receiver: string, invokeId: number, values: any[]): void;
    iAmResponse(deviceId: number, segmentation: number, vendorId: number): void;
    iHaveResponse(deviceId: BACNetObjectID, objectId: BACNetObjectID, objectName: string): void;
    simpleAckResponse(receiver: string, service: number, invokeId: number): void;
    errorResponse(receiver: string, service: number, invokeId: number, errorClass: number, errorCode: number): void;
    /**
     * Unloads the current BACstack instance and closes the underlying UDP socket.
     * @function bacstack.close
     * @example
     * const bacnet = require('bacstack');
     * const client = new bacnet();
     *
     * client.close();
     */
    close(): void;
}

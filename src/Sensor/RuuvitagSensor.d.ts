import { EventEmitter } from "stream";

export interface RuuviTag extends EventEmitter {
    id: string,
    address: string,
    addressType: string,
    connectable: boolean
}

export type TagData = {
    dataFormat: number,
    rssi: number,
    temperature: number,
    humidity: number,
    pressure: number,
    accelerationX: number,
    accelerationY: number,
    accelerationZ: number,
    battery: number,
    txPower: number,
    movementCounter: number,
    measurementSequenceNumber: number,
    mac: string
}


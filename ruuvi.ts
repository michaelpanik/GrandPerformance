import { EventEmitter } from "stream";

const ruuvi = require('node-ruuvitag');

type TagData = {
  "dataFormat": number,
  "rssi": number,
  "temperature": number,
  "humidity": number,
  "pressure": number,
  "accelerationX": number,
  "accelerationY": number,
  "accelerationZ": number,
  "battery": number,
  "txPower": number,
  "movementCounter": number,
  "measurementSequenceNumber": number,
  "mac": string
}

interface RuuviTag extends EventEmitter {
  id: string,
  address: string,
  addressType: string,
  connectable: boolean
}

ruuvi.on('found', (tag: RuuviTag) => {
  console.log('Found RuuviTag, id: ' + tag.id);
  tag.on('updated', (data: TagData) => {
    console.log('Got data from RuuviTag ' + tag.id + ':\n' +
      JSON.stringify(data, null, '\t'));
  });
});

ruuvi.on('warning', (message: any) => {
  console.error(new Error(JSON.stringify(message)));
});
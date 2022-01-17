import RuuvitagIO from '../IO/RuuvitagIO';
import Sensor from "./Sensor"
import { EventEmitter } from "stream";
import { RuuviTag, TagData } from './RuuvitagSensor.d';
import { LogRecord } from '../Logger/Logger.d';
import { SensorConfig } from './Sensor.d';
import { calculateVPD } from '../helpers';
const ruuvi = require('node-ruuvitag')

class RuuviTagSensor {
  private _tag: RuuviTag | null = null
  private _tagData: TagData | null = null
  public id: string
  public isReady: boolean = false

  constructor(config: SensorConfig<{}>) {
    // super({ id: config.id })
    this.id = config.id
    ruuvi.on('found', (tag: RuuviTag) => {
      if (tag.id === config.id) {
        this._tag = tag
        tag.on('updated', data => {
          data.vpd = calculateVPD(data.humidity, data.temperature)
          this._tagData = data
          this.isReady = true
        })
      }
    })
  }

  public getStatus(): any {
    if (!this.isReady || !this._tagData) {
      return null
    }

    const status: LogRecord[] = []

    Object.entries(this._tagData).forEach(([key, value]) => {
      return (
        status.push({
          key: key,
          value: value,
          timestamp: Date.now(),
          metadata: [{
            key: "sensor_type",
            value: "ruuvitag"
          }, {
            key: "sensor_id",
            value: this.id
          }]
        })
      )
    })

    return status
  }

  public read(): TagData {
    if (this._tagData) {
      return this._tagData
    } else {
      throw new Error('No tag data found.')
    }
  }
}

export default RuuviTagSensor;




ruuvi.on('warning', (message: any) => {
  console.error(new Error(JSON.stringify(message)));
});
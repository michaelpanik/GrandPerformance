import { LogRecord } from "../Logger/Logger.d";
import { SensorConfig } from "./Sensor.d";

abstract class Sensor {
  protected _io: any;

  constructor(config: SensorConfig<{}>) {
    this._io = config.io;
  }

  abstract read(pin: number | string): any;
  abstract getStatus(): LogRecord;
}

export default Sensor;

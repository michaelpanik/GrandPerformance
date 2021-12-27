import IO from "../IO/IO";
import { SensorConfig } from "./Sensor.d";

abstract class Sensor {
  protected _io: IO;

  constructor(config: SensorConfig<{}>) {
    this._io = config.io;
  }

  abstract read(): number;
  abstract getStatus(): string;
}

export default Sensor;

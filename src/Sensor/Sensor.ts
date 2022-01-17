import { LogRecord } from "../Logger/Logger.d";
import { SensorConfig } from "./Sensor.d";

abstract class Sensor {
  public id: string;

  constructor(config: SensorConfig<{}>) {
    this.id = config.id
  }

  abstract getStatus(): LogRecord[];
}

export default Sensor;

import Sensor from "./Sensor";
import BLEIO from "../IO/BLEIO";
import { RuuvitagSensorConfig } from "./Sensor.d";

class RuuvitagSensor extends Sensor {
  protected _io: BLEIO;

  constructor(config: RuuvitagSensorConfig) {
    super(config);
    this._io = config.io;
  }

  public getStatus(): string {
    return "status";
  }

  public read(): number {
    return 0;
  }
}

export default RuuvitagSensor;

import RS485IO from "../IO/RS485IO";
import Sensor from "./Sensor";
import { SoilMoistureSensorConfig } from "./Sensor.d";

class SoilMoistureSensor extends Sensor {
  protected _io: RS485IO;

  constructor(config: SoilMoistureSensorConfig) {
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

export default SoilMoistureSensor;

import * as fs from "fs";
import ControllinoMegaIO from "../IO/ControllinoMegaIO";
import { IIO } from "../IO/IO.d";
// import FurnaceAirConditioner from "../Integration/FurnaceAirConditioner";
import RuuvitagSensor from "../Sensor/RuuviTagSensor";
import Sensor from "../Sensor/Sensor";
import SoilMoistureSensor from "../Sensor/SoilMoistureSensor";

import {
  ConfigFile,
  ConfigIntegration,
  ConfigIO,
  ConfigSensor,
} from "./Config.d";

// interface IIntegration {
//   power: boolean;
// }

// class AirConditioner implements IIntegration {
//   private _power: boolean;

//   constructor() {
//     this._power = false;
//   }

//   public get power() {
//     return this._power;
//   }
//   public set power(state: boolean) {
//     this._power = state;
//   }
// }

// TODO: parse out the IO, provide to sensors and integrations
// TODO: return {io, sensors, integrations} from class
class Config {
  // private _integrations: AirConditioner[];
  private _sensors: Sensor[];

  constructor(configFilePath: string) {
    const { sensors, io } = this.parseConfigFile(configFilePath);

    this._io = io;
    // this._integrations = integrations;
    this._sensors = sensors;
  }

  private parseConfigFile(configFilePath: string) {
    const rawData: Buffer = fs.readFileSync(configFilePath);
    const config: ConfigFile = JSON.parse(rawData.toString());

    return {
      // integrations: this.parseIntegrations(config.integrations),
      sensors: this.parseSensors(config.sensors),
    };
  }

  private parseIO(io: ConfigIO) {
    const IOs = new Map<string, IIO>([
      ["ControllinoMegaIO", ControllinoMegaIO],
    ]);
    return;
  }

  // private parseIntegrations(integrationList: ConfigIntegration[]) {
  //   const integrations = new Map<string, any>([
  //     ["AirConditioner", AirConditioner],
  //   ]);

  //   return integrationList.map(({ type }) => {
  //     if (integrations.has(type)) {
  //       console.log(integrations.get(type));
  //       return new (integrations.get(type))();
  //     }
  //   });
  // }

  private parseSensors(sensorList: ConfigSensor[]) {
    const sensors = new Map<string, Sensor>([
      // TODO: this should be a class that implements IIO, not any
      ["Ruuvitag", RuuvitagSensor],
      ["SoilMoisture", SoilMoistureSensor],
    ]);

    return sensorList.map(({ type, id }) => {
      if (sensors.has(type)) {
        console.log(sensors.get(type));
        return new (sensors.get(type))(id, new ControllinoMegaIO()); // TODO: How do we determine which IO to use?? Controllino + Ruuvitag??
      }
    });
  }

  // public get integrations() {
  //   return this._integrations;
  // }

  public get sensors() {
    return this._sensors;
  }
}

export default Config;

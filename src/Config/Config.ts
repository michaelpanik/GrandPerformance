/**
 * BIG IMPORTANT TODO:
 *
 * Need to parse IOs, then parse their Integrations/Sensors and attach instance
 * of that IO to them. Keep IO injectable, but flow nicely in the config
 */

import * as fs from "fs";
import ControllinoMegaIO from "../IO/ControllinoMegaIO";
import IO from "../IO/IO";
import FurnaceAirConditioner from "../Integration/FurnaceAirConditioner";
import RuuvitagSensor from "../Sensor/RuuvitagSensor";
import Sensor from "../Sensor/Sensor";
import SoilMoistureSensor from "../Sensor/SoilMoistureSensor";

import {
  ConfigFile,
  ConfigIntegration,
  ConfigIO,
  ConfigSensor,
} from "./Config.d";
import Integration from "../Integration/Integration";

class Config {
  private _integrations: Integration[];
  private _sensors: Sensor[];
  private _io: IO[];

  constructor(configFilePath: string) {
    const { io, integrations, sensors } = this.parseConfigFile(configFilePath);

    this._io = io;
    this._integrations = integrations;
    this._sensors = sensors;
  }

  private parseConfigFile(configFilePath: string) {
    const rawData: Buffer = fs.readFileSync(configFilePath);
    const config: ConfigFile = JSON.parse(rawData.toString());

    return {
      integrations: this.parseIntegrations(config.integrations),
      sensors: this.parseSensors(config.sensors),
      io: this.parseIO(config.io),
    };
  }

  private parseIO(ioList: ConfigIO[]): IO[] {
    const ios = new Map<string, any>([
      ["ControllinoMegaIO", ControllinoMegaIO],
    ]);
    return ioList.map(({ type }) => {
      if (ios.has(type)) {
        return new (ios.get(type))();
      }
    });
  }

  private parseIntegrations(integrationList: ConfigIntegration[]) {
    // TODO: this should be a class that implements IIO, not any
    const integrations = new Map<string, any>([
      ["FurnaceAirConditioner", FurnaceAirConditioner],
    ]);

    return integrationList.map(({ type, id }) => {
      if (integrations.has(type)) {
        console.log(integrations.get(type));
        return new (integrations.get(type))(id, new ControllinoMegaIO()); // TODO: How do we determine which IO to use?? Controllino + Ruuvitag??
      }
    });
  }

  private parseSensors(sensorList: ConfigSensor[]) {
    // TODO: this should be a class that implements IIO, not any
    const sensors = new Map<string, any>([
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

  public get io() {
    return this._io;
  }

  public get integrations() {
    return this._integrations;
  }

  public get sensors() {
    return this._sensors;
  }
}

export default Config;

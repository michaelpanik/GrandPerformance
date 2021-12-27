import IO from "../IO/IO";

export type SensorConfig<T> = {
  io: IO;
  pins: T;
};

export type SoilMoistureSensorConfig = SensorConfig<{
  a: string;
  b: string;
}>;

export type RuuvitagSensorConfig = SensorConfig<{}>;

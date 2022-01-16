export type SensorConfig<T> = {
  io: any;
};

export type SoilMoistureSensorConfig = SensorConfig<{
  a: string;
  b: string;
}>;

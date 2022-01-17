export type SensorConfig<T> = {
  id: string
};

export type SoilMoistureSensorConfig = SensorConfig<{
  a: string;
  b: string;
}>;

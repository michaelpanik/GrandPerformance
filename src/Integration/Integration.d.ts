import IO from "../IO/IO";

export type IntegrationConfig<T> = {
  io: IO;
  pins: {
    power: string;
  } & T;
};

export type FurnaceAirConditionerConfig = IntegrationConfig<{
  fan: string;
  compressor: string;
  valve: string;
}>;

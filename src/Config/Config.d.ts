export type ConfigIO = {
  type: string;
  sensors?: ConfigSensor[];
  integrations?: ConfigIntegration[];
};

export type ConfigPin = {
  type: string;
  id: number;
};

export type ConfigIntegration = {
  id: string;
  type: string;
  options: {
    pins: ConfigPin[];
  };
};

type ConfigSensorPins = {
  pins: ConfigPin[];
}

export type ConfigSensor = {
  id: string;
  type: string;
  options?: ConfigSensorPins
};

export type ConfigFile = {
  io: ConfigIO[];
  sensors: ConfigSensor[];
  integrations: ConfigIntegration[];
};

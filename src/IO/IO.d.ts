export type PinValue = 1 | 0 | boolean;

export type Input = {
  pinId: string | number;
  type: InputTypes;
};

export const enum InputTypes {
  DIGITAL,
  ANALOG,
  RS485A,
  RS485B,
}

export type Output = {
  pinId: string | number;
  type: OutputTypes;
};

export const enum OutputTypes {
  DIGITAL,
  ANALOG,
  RS485,
  RELAY,
  PWM,
}

export interface IInput {
  inputs: Map<string, any>;
  read(pinId: string): number | Promise<number>;
}

export interface IOutput {
  outputs: Map<string, any>;
  write(pinId: string, value: PinValue): void | Promise<void>;
}

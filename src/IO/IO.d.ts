export type PinValue = 1 | 0 | boolean;

export type Input = {
  pinId: string | number;
  type: InputTypes;
};

export const enum InputTypes {
  DIGITAL,
  ANALOG,
  RS485,
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

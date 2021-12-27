import { PinValue } from "./IO.d";

abstract class IO {
  inputs: Map<string, any> = new Map();
  outputs: Map<string, any> = new Map();

  abstract read(pinId: string): number;
  abstract write(pinId: string, value: PinValue): void;
}

export default IO;

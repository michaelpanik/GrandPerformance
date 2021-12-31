import IO, { IInput } from "./IO";
import { PinValue } from "./IO.d";

class BLEIO implements IInput {
  read(pinId: string): number {
    return 0;
  }
}

export default BLEIO;

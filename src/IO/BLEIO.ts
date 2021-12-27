import IO from "./IO";
import { PinValue } from "./IO.d";

class BLEIO extends IO {
  read(pinId: string): number {
    return 0;
  }

  write(pinId: string, value: PinValue): void {
    return;
  }
}

export default BLEIO;

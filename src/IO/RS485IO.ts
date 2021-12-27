import IO from "./IO";
import { PinValue } from "./IO.d";

class RS485IO extends IO {
  inputs = new Map<string, any>([]);

  read(pinId: string): number {
    // TODO: Implement read from RS485
    return 0;
  }

  write(pinId: string, value: PinValue) {
    // TODO: Implement write to RS485
    this.inputs.set(pinId, value);
  }
}

export default RS485IO;

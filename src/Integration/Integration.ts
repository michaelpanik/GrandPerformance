import IO from "../IO/IO";
import { IntegrationConfig } from "./Integration.d";

abstract class Integration {
  protected _io: IO;
  protected _power: boolean;
  protected _powerPin: string;

  constructor({ pins, io }: IntegrationConfig<{}>) {
    this._io = io;
    this._powerPin = this._io.outputs.get(pins.power);
  }

  public get power() {
    return this._power;
  }

  public set power(state: boolean) {
    this._io.outputs.set(this._powerPin, state);
    this._power = state;
  }
}

export default Integration;

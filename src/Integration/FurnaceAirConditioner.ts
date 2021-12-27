import Integration from "./Integration";
import { FurnaceAirConditionerConfig } from "./Integration.d";

class FurnaceAirConditioner extends Integration {
  private _fan: boolean;
  private _compressor: boolean;
  private _valve: boolean;

  private _fanPin: string;
  private _compressorPin: string;
  private _valvePin: string;

  constructor(config: FurnaceAirConditionerConfig) {
    super(config);
    this._fanPin = config.pins.fan;
    this._compressorPin = config.pins.compressor;
    this._valvePin = config.pins.valve;
  }

  public get fan() {
    return this._fan;
  }

  public set fan(state: boolean) {
    this._io.outputs.set(this._fanPin, state);
    this._fan = state;
  }

  public get compressor() {
    return this._compressor;
  }

  public set compressor(state: boolean) {
    this._io.outputs.set(this._compressorPin, state);
    this._compressor = state;
  }

  public get valve() {
    return this._valve;
  }

  public set valve(state: boolean) {
    this._io.outputs.set(this._valvePin, state);
    this._valve = state;
  }
}

export default FurnaceAirConditioner;

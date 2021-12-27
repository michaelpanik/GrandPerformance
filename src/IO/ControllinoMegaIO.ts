import { Input, InputTypes, Output, OutputTypes } from "./IO.d";
import { Pin, Board } from "johnny-five";
import IO from "./IO";

class ControllinoMegaIO extends IO {
  readonly board;
  inputs: Map<string, Pin> = new Map();
  outputs: Map<string, Pin> = new Map();
  d;

  constructor() {
    super();
    this.board = new Board({});
    this.board.on("ready", this.handleReadyEvent);
  }

  private handleReadyEvent() {
    this.inputs = this.createInputs([
      { pinId: "A0", type: InputTypes.ANALOG },
      { pinId: "A1", type: InputTypes.ANALOG },
      { pinId: "A2", type: InputTypes.ANALOG },
      { pinId: "A3", type: InputTypes.ANALOG },
      { pinId: "A4", type: InputTypes.ANALOG },
      { pinId: "A5", type: InputTypes.ANALOG },
      { pinId: "A6", type: InputTypes.ANALOG },
      { pinId: "A7", type: InputTypes.ANALOG },
      { pinId: "A8", type: InputTypes.ANALOG },
      { pinId: "A9", type: InputTypes.ANALOG },
      { pinId: "A10", type: InputTypes.ANALOG },
      { pinId: "A11", type: InputTypes.ANALOG },
      { pinId: "A12", type: InputTypes.ANALOG },
      { pinId: "A13", type: InputTypes.ANALOG },
      { pinId: "A14", type: InputTypes.ANALOG },
      { pinId: "A15", type: InputTypes.ANALOG },
      { pinId: 38, type: InputTypes.DIGITAL },
      { pinId: 39, type: InputTypes.DIGITAL },
      { pinId: 40, type: InputTypes.DIGITAL },
    ]);
    this.outputs = this.createOutputs([
      { pinId: 2, type: OutputTypes.PWM },
      { pinId: 3, type: OutputTypes.PWM },
      { pinId: 4, type: OutputTypes.PWM },
      { pinId: 5, type: OutputTypes.PWM },
      { pinId: 6, type: OutputTypes.PWM },
      { pinId: 7, type: OutputTypes.PWM },
      { pinId: 8, type: OutputTypes.PWM },
      { pinId: 9, type: OutputTypes.PWM },
      { pinId: 10, type: OutputTypes.PWM },
      { pinId: 11, type: OutputTypes.PWM },
      { pinId: 12, type: OutputTypes.PWM },
      { pinId: 13, type: OutputTypes.PWM },
      { pinId: 42, type: OutputTypes.DIGITAL },
      { pinId: 43, type: OutputTypes.DIGITAL },
      { pinId: 44, type: OutputTypes.PWM },
      { pinId: 45, type: OutputTypes.PWM },
      { pinId: 46, type: OutputTypes.PWM },
      { pinId: 47, type: OutputTypes.DIGITAL },
      { pinId: 48, type: OutputTypes.DIGITAL },
      { pinId: 49, type: OutputTypes.DIGITAL },
      { pinId: 22, type: OutputTypes.RELAY },
      { pinId: 23, type: OutputTypes.RELAY },
      { pinId: 24, type: OutputTypes.RELAY },
      { pinId: 25, type: OutputTypes.RELAY },
      { pinId: 26, type: OutputTypes.RELAY },
      { pinId: 27, type: OutputTypes.RELAY },
      { pinId: 28, type: OutputTypes.RELAY },
      { pinId: 29, type: OutputTypes.RELAY },
      { pinId: 30, type: OutputTypes.RELAY },
      { pinId: 31, type: OutputTypes.RELAY },
      { pinId: 32, type: OutputTypes.RELAY },
      { pinId: 33, type: OutputTypes.RELAY },
      { pinId: 34, type: OutputTypes.RELAY },
      { pinId: 35, type: OutputTypes.RELAY },
      { pinId: 36, type: OutputTypes.RELAY },
      { pinId: 37, type: OutputTypes.RELAY },
    ]);
  }

  private createInputs(pins: Array<Input>): Map<string, Pin> {
    const inputs: Array<[string, Pin]> = pins.map((pin) => {
      return [`${pin.pinId}`, new Pin(pin.pinId)];
    });
    return new Map(inputs);
  }

  private createOutputs(pins: Array<Output>): Map<string, Pin> {
    const inputs: Array<[string, Pin]> = pins.map((pin) => {
      return [`${pin.pinId}`, new Pin(pin.pinId)];
    });
    return new Map(inputs);
  }

  public read(pinId: string): number {
    if (this.inputs.has(pinId)) {
      const pin = this.inputs.get(pinId);

      let pinValue = 0;
      pin?.read((error, value) => {
        if (error) throw error;

        pinValue = value;
      });
      return pinValue;
    } else {
      throw new Error(`No pin with ID ${pinId} exists on IO device.`);
    }
  }

  public write(pinId: string, value: 0 | 1 | boolean): void {
    if (typeof value === "boolean") {
      value = value ? 0 : 1;
    }

    if (this.outputs.has(pinId)) {
      const pin = this.outputs.get(pinId);
      pin?.write(value);
    } else {
      throw new Error(
        `No pin with ID ${pinId} exists on IO device, or it isn't available for writing.`
      );
    }
  }
}

export default ControllinoMegaIO;

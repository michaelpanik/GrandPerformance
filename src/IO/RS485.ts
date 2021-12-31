import IO, { IInput } from "./IO";
import { PinValue } from "./IO";
import ModbusRTU from "modbus-serial";

class RS485IO {
  private _port: string;
  private _client: ModbusRTU;

  constructor(port: string) {
    this._port = port;
    this._client = new ModbusRTU();
    this.connect();
  }

  public async connect() {
    try {
      await this._client.connectRTUBuffered(this._port, { baudRate: 9600 });
      this._client.setTimeout(500);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  public async read(
    device: number,
    address: number,
    length: number
  ): Promise<number> {
    this._client.setID(device);
    const input = await this._client.readDiscreteInputs(address, length);
    console.log(input.data);
    return 1;
  }
}

export default RS485IO;

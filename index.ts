const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const ByteLength = require("@serialport/parser-byte-length");
import ModbusRTU from "modbus-serial";
import Config from "./src/Config/Config";
import FurnaceAirConditioner from "./src/Integration/FurnaceAirConditioner";
import ControllinoMegaIO from "./src/IO/ControllinoMegaIO";
import RS485 from "./src/IO/RS485";
import AWSTimestreamLogger from "./src/Logger/AWSTimestreamLogger";
import ConsoleLogger from "./src/Logger/ConsoleLogger";
import { LogRecord } from "./src/Logger/Logger.d";

async function main() {
  const logger = new AWSTimestreamLogger({
    databaseName: "sensor-data",
    tableName: "test-account-1",
  });
  // const logger = new ConsoleLogger();

  const { sensors } = new Config("config.json");

  sensors.forEach((sensor) => {
    setInterval(async () => {
      const status: LogRecord[] | null = sensor.getStatus();

      if (!status) return

      logger.log(status);
    }, 1000);
  });

  //   let counter = 0;
  //   const pins = [
  //     2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 42, 43, 44, 45, 46, 47, 48, 49, 22,
  //     23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
  //   ];
  //   io.board.on("ready", () => {
  //     setInterval(() => {
  //       let nextPin = counter + 1 < pins.length ? counter + 1 : 0;

  //       io.write(pins[counter].toString(), 0);
  //       io.write(pins[nextPin].toString(), 1);
  //       counter = nextPin;
  //     }, 100);
  //   });

  // const io = new ControllinoMegaIO();

  // const ac = new FurnaceAirConditioner({
  //   pins: {
  //     power: "2",
  //     fan: "3",
  //     compressor: "4",
  //     valve: "5",
  //   },
  //   io,
  // });

  // io.board.on("ready", () => {
  //   ac.power = true;
  // });

  // const port = new SerialPort("/dev/cu.usbmodem14101", {
  //   dataBits: 8,
  //   parity: "none",
  //   stopBits: 1,
  //   baudRate: 9600,
  // });

  // port.write([0x01, 0x03, 0x00, 0x02, 0x00, 0x02, 0x65, 0xCB])

  // port.on('data', console.log)


}
main();

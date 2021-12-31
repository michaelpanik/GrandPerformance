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

async function main() {
  // const logger = new AWSTimestreamLogger({
  //   databaseName: "sensor-data",
  //   tableName: "test-account-1",
  // });
  // const logger = new ConsoleLogger();

  // const { sensors, integrations, io } = new Config("config.json");

  // config.sensors.forEach((sensor) => {
  //   setInterval(async () => {
  //     const status = sensor.getStatus();
  //     logger.log(status);
  //   }, 250);
  // });

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

  const port = new SerialPort("/dev/cu.usbmodem11101", {
    dataBits: 8,
    parity: "none",
    stopBits: 1,
    baudRate: 9600,
  });
  const parser = new ByteLength({ length: 8 });
  port.pipe(parser);

  setInterval(() => {
    port.write([0x01, 0x04, 0x0000, 0x0003, 0xb00b]);
  }, 1000);

  parser.on("data", (data: Buffer) => {
    console.log("Data: ", data.toJSON());
  });
}
main();

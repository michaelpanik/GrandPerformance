import { mem } from "systeminformation";
import AWSTimestreamLogger from "./src/Logger/AWSTimestreamLogger";
import ConsoleLogger from "./src/Logger/ConsoleLogger";

require("dotenv").config();

function main() {
  // const logger = new ConsoleLogger();
  const logger = new AWSTimestreamLogger({
    databaseName: "sensor-data",
    tableName: "test-account-1",
  });

  setInterval(async () => {
    const speed = await mem();
    logger.log([
      {
        key: "cpu_speed",
        value: `${speed.active}`,
        timestamp: Date.now(),
        metadata: [
          {
            key: "device_id",
            value: "000001",
          },
        ],
      },
    ]);
  }, 250);
}
main();

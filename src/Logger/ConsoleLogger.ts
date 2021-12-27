import Logger from "./Logger";
import { LogRecord } from "./Logger.d";

class ConsoleLogger extends Logger {
  log(records: LogRecord[]): void {
    console.log(JSON.stringify(records, null, 2));
  }
}

export default ConsoleLogger;

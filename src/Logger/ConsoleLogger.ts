import Logger from "./Logger";
import { LogRecord } from "./Logger.d";

class ConsoleLogger extends Logger {
  log(records: LogRecord[]): void {
    console.log(records);
  }
}

export default ConsoleLogger;

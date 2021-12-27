import { LogRecord } from "./Logger.d";

abstract class Logger {
  abstract log(records: LogRecord[]): void;
}

export default Logger;

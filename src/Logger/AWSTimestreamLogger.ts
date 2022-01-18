import Logger from "./Logger";
import { LogRecord } from "./Logger.d";
import { AWSTimestreamLoggerConfig } from "./AWSTimestreamLogger.d";
import {
  MeasureValue,
  MeasureValueType,
  RejectedRecordsException,
  TimestreamWriteClient,
  WriteRecordsCommand,
  _Record,
} from "@aws-sdk/client-timestream-write";

class AWSTimestreamLogger extends Logger {
  private _client;
  private _databaseName;
  private _tableName;

  constructor(config: AWSTimestreamLoggerConfig) {
    super();
    this._databaseName = config.databaseName;
    this._tableName = config.tableName;

    this._client = new TimestreamWriteClient({
      region: process.env.AWSRegion,
      credentials: {
        accessKeyId: process.env.AWSAccessKeyId,
        secretAccessKey: process.env.AWSSecretKey,
      },
    });
  }

  async log(records: LogRecord[]): Promise<void> {
    try {
      const logRecords: _Record[] = records.map((record) => ({
        MeasureName: record.key.toString(),
        MeasureValue: record.value.toString(),
        MeasureValueType: typeof record.value === 'number' ? MeasureValueType.DOUBLE : MeasureValueType.VARCHAR,
        Time: record.timestamp.toString(),
        Dimensions: record.metadata.map((metadata) => ({
          Name: metadata.key.toString(),
          Value: metadata.value.toString(),
        })),
      }));

      const command = new WriteRecordsCommand({
        DatabaseName: this._databaseName,
        TableName: this._tableName,
        Records: logRecords,
      });
      await this._client.send(command);
    } catch (error: any) {
      console.log(error)
      throw error;
    }
  }
}

export default AWSTimestreamLogger;

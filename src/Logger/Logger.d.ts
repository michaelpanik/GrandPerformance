export type LogRecord = {
  key: string;
  value: string;
  timestamp: number;
  metadata: Array<{
    key: string;
    value: string;
  }>;
};

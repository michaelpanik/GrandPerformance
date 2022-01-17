export type LogRecord = {
  key: string;
  value: string | number;
  timestamp: number;
  metadata: Array<{
    key: string;
    value: string | number;
  }>;
};

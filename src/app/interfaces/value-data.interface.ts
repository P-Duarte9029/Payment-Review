export interface ValueData {
  info: string;
  value: number;
  isPaidReceived: boolean;
  date: Date;
  type: 'toPay' | 'toReceive';
  id?: string;
}
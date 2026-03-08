export type TransactionStatus = "Success" | "Failed";

export interface Transaction {
  id: string;
  amount: number;
  status: TransactionStatus;
  date: string;
}

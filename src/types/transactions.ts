export enum TransactionType {
  EXPENSE = "expense",
  INCOME = "income",
}

export interface TransactionFilter {
  month: number;
  year: number;
  categoryId?: string;
  type?: TransactionType;
};
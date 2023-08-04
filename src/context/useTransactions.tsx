import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export enum TransactionTypes {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

export type TransactionType = {
  id: string;
  title: string;
  amount: number;
  type: TransactionTypes;
  category: string;
  createdAt: string;
}

type TransactionInput = {
  id?: string;
  title: string;
  amount: number;
  type: TransactionTypes;
  category: string;
  crearedAt?: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: TransactionType[];
  createTransaction: (transaction: TransactionInput) => void;
  updateTransaction: (transaction: TransactionType) => void;
  deleteTransaction: (id: string) => void;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    const localTransactions = JSON.parse(localStorage.getItem("transactions") ?? "[]")
    setTransactions(localTransactions)
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const createTransaction = useCallback((transactionInput: TransactionInput) => {
    const newTransactions = [{
      ...transactionInput,
      createdAt: new Date().toISOString(),
      id: String(new Date().getTime())
    },...transactions]

    setTransactions(newTransactions);
    localStorage.setItem("transactions", JSON.stringify(newTransactions))
  }, [transactions]);

  const updateTransaction = useCallback((transactionInput: TransactionInput) => {
    const newTransactions = transactions.map(transaction => transaction.id === transactionInput.id ? transactionInput : transaction) as TransactionType[]
    setTransactions(newTransactions);
  }, [transactions])

  const deleteTransaction = useCallback((id: string) => {
    const newTransactions = transactions.filter(transaction => transaction.id !== id)
    setTransactions(newTransactions);
    localStorage.setItem("transactions", JSON.stringify(newTransactions))
  }, [transactions]);

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction,
      updateTransaction,
      deleteTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  return context;
};

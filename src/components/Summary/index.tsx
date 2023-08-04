import { Container } from "./styles";
import {
  BsArrowDownCircle,
  BsArrowUpCircle,
} from "react-icons/bs";
import { TransactionTypes, useTransactions } from "../../context/useTransactions";
import { SummaryCard } from "../SummaryCard";

export const Summary = () => {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === TransactionTypes.DEPOSIT) {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraw += transaction.amount;
        acc.total -= transaction.amount;
      }
      return acc;
    },
    {
      deposits: 0,
      withdraw: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <SummaryCard
        title="Entradas"
        amount={summary.deposits}
        icon={<BsArrowUpCircle size={22} color="#33cc95" />}
        textStyle="text-success"
      />
      <SummaryCard
        title="Saídas"
        amount={summary.withdraw}
        icon={<BsArrowDownCircle size={22} color="#EB1800" />}
        textStyle="text-danger"
      />
      <SummaryCard
        title="Total"
        amount={summary.total}
        isTotal
      />
    </Container>
  );
};

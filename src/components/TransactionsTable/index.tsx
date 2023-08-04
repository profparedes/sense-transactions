import { TransactionType, TransactionTypes, useTransactions } from "../../context/useTransactions";
import { ActionButton, Container } from "./styles";
import { GrEdit } from "react-icons/gr"
import { RiDeleteBin5Line } from "react-icons/ri"
import { useCallback, useMemo, useState } from "react";
import { ConfirmationModal } from "../ConfirmationModal";
import { formatCurrency, formatDate } from "../../helpers";
import { EditTransactionModal } from "../EditTransactionModal";

export const TransactionsTable = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const [transactionToEdit, setTransactionToEdit] = useState<TransactionType | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<TransactionType | null>(null);
  const [typeFilter, setTypeFilter] = useState<'all' | TransactionTypes>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const handleCloseDeleteModal = useCallback(() => setTransactionToDelete(null), [])

  const handleDeleteTransaction = useCallback((id) => {
    deleteTransaction(id)
    handleCloseDeleteModal()
  }, [deleteTransaction, handleCloseDeleteModal])

  const filteredTransactions = useMemo(() => transactions.filter((transaction) =>typeFilter === 'all' || typeFilter === transaction.type)
    .filter((transaction) => categoryFilter === 'all' || transaction.category.toLocaleLowerCase() === categoryFilter.toLocaleLowerCase())
    .map((transaction) => (
      <tr key={transaction.id}>
        <td>{transaction.title}</td>
        <td className={transaction?.type}>{formatCurrency(transaction.amount)}</td>
        <td>{transaction.category}</td>
        <td>{formatDate(transaction.createdAt)}</td>
        <td>
          <div className="d-flex gap-3">
            <ActionButton onClick={() => setTransactionToEdit(transaction)}><GrEdit /></ActionButton>
            <ActionButton onClick={() => setTransactionToDelete(transaction)}><RiDeleteBin5Line /></ActionButton>
          </div>
        </td>
      </tr>
    ))
  , [categoryFilter, transactions, typeFilter])

  const categoryFilterOptions = useMemo(() => transactions.map((transaction) => transaction.category.toLocaleLowerCase())
      .filter((category, index, array) => array.indexOf(category) === index)
      .map((category) => category.charAt(0).toUpperCase() + category.slice(1))
      .sort()
      .map((category) => (
        <option key={category} value={category}>{category}</option>
      ))
  , [transactions])

  return (
    <Container className="mb-4">
      {transactions.length > 0 ? (
        <>
          <div className="d-flex gap-3 justify-content-end my-3 align-items-center">
            <p>Filtros:</p>
            <div className="d-flex flex-column">
              <label>Tipo:</label>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as 'all' | TransactionTypes)}>
                <option value="all">Todos</option>
                <option value={TransactionTypes.DEPOSIT}>Entradas</option>
                <option value={TransactionTypes.WITHDRAW}>Saídas</option>
              </select>
            </div>
            <div className="d-flex flex-column">
              <label>Categoria:</label>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="all">Todos</option>
                {categoryFilterOptions}
              </select>
            </div>
          </div>
            <table className="w-100">
              <thead>
                <tr>
                  <th>Títulos</th>
                  <th>Valor</th>
                  <th>Categorias</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions}
              </tbody>
            </table>
        </>
      ) : (<h2 className="mt-3">Crie uma nova transação</h2>)}
      {transactionToDelete && (
        <ConfirmationModal
          isOpen
          title="Excluir transação"
          onConfirm={() => handleDeleteTransaction(transactionToDelete.id)}
          onRequestClose={handleCloseDeleteModal}
          onCancel={handleCloseDeleteModal}
        >
          Tem certeza que deseja excluir essa transação?

          <p className="mt-3">
            {transactionToDelete.title}, valor: R${transactionToDelete.amount} publicada em: {formatDate(transactionToDelete.createdAt)}
          </p>
        </ConfirmationModal>
      )}
      {transactionToEdit && (
        <EditTransactionModal
        transaction={transactionToEdit}
        isOpen
        onRequestClose={() => setTransactionToEdit(null)}
      />
      )}
    </Container>
  );
};

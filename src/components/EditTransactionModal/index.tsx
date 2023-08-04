import { FormEvent, useCallback, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import Modal from "react-modal";
import { TransactionType, TransactionTypes, useTransactions } from "../../context/useTransactions";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
Modal.setAppElement("#root");

interface EditTransactionModalProps {
  isOpen: boolean;
  transaction: TransactionType
  onRequestClose: () => void;
}

export const EditTransactionModal = ({
  transaction,
  isOpen,
  onRequestClose,
}: EditTransactionModalProps) => {
  const { updateTransaction } = useTransactions();

  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount);
  const [category, setCategory] = useState(transaction.category);
  const [type, setType] = useState(transaction.type);

  const handleUpdateTransaction = useCallback((event: FormEvent) => {
    event.preventDefault();

    updateTransaction({
      id: transaction.id,
      title,
      amount,
      category,
      type,
      createdAt: transaction.createdAt,
    });

    onRequestClose();
  }, [amount, category, onRequestClose, title, transaction.createdAt, transaction.id, type, updateTransaction]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          className="react-modal-close"
          onClick={onRequestClose}
        >
          <AiOutlineClose color="#969cb3" />
        </button>
        <Container onSubmit={handleUpdateTransaction}>
          <h2>Editar transação</h2>
          <input
            placeholder="Título"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={(event) => setAmount(parseFloat(event.target.value))}
          />
          <TransactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => setType(TransactionTypes.DEPOSIT)}
              isActive={type === TransactionTypes.DEPOSIT}
              activeColor="green"
            >
              <BsArrowUpCircle color="#33cc95" size={22} />
              <span>Entrada</span>
            </RadioBox>
            <RadioBox
              type="button"
              onClick={() => setType(TransactionTypes.WITHDRAW)}
              isActive={type === TransactionTypes.WITHDRAW}
              activeColor="red"
            >
              <BsArrowDownCircle color="#e52e4d" size={22} />
              <span>Saída</span>
            </RadioBox>
          </TransactionTypeContainer>
          <input
            placeholder="Categoria"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <button type="submit">Atualizar</button>
        </Container>
      </Modal>
    </>
  );
};

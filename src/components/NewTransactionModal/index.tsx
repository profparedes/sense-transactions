import { FormEvent, useCallback, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import Modal from "react-modal";
import { TransactionTypes, useTransactions } from "../../context/useTransactions";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
Modal.setAppElement("#root");

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) => {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState(TransactionTypes.DEPOSIT);

  const handleCreateNewTransaction = useCallback((event: FormEvent) => {
    event.preventDefault();

    createTransaction({
      title,
      amount,
      category,
      type,
    });

    setTitle("");
    setAmount(0);
    setCategory("");
    setType(TransactionTypes.DEPOSIT);
    onRequestClose();
  }, [amount, category, createTransaction, onRequestClose, title, type]);

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
        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar transação</h2>
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
          <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
    </>
  );
};

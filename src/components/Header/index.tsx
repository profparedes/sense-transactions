import { Container, Contant } from "./styles";


interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export const Header = ({ onOpenNewTransactionModal }: HeaderProps) => (
    <Container>
      <Contant className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-end">
          <img src="https://sensedata.com.br/wp-content/uploads/2022/07/fav.svg" alt="Logo"/>
          <span>Sense Transactions</span>
        </div>
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Contant>
    </Container>
  );

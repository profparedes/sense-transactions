import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { ActionButton } from "./styles";

Modal.setAppElement("#root");

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  onRequestClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal = ({
  isOpen,
  title,
  children,
  onRequestClose,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => (
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
    <div>
      {title && <h2>{title}</h2>}
      {children}
      <div className="d-flex gap-3">
        <ActionButton type="button" onClick={onConfirm}>
          Confirmar
        </ActionButton>
        <ActionButton type="button" onClick={onCancel}>
          Cancelar
        </ActionButton>
      </div>
    </div>
  </Modal>
);

import React from "react";
import Modal from "../ui/Modal/Modal";
import Button from "../ui/Button/Button";

import styles from "./ConfirmModal.module.scss";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.ConfirmModal}>
        <h2 className={styles.ConfirmModal__title}>
          Вы уверены, что хотите удалить этот семинар?
        </h2>
        <div className={styles.ConfirmModal__block}>
          <Button onClick={onConfirm}>Да</Button>
          <Button variant="secondary" onClick={onClose}>
            Нет
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

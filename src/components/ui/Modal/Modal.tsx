import React, { useEffect } from "react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  //  прокрутка body
  const toggleBodyScroll = (shouldDisable: boolean) => {
    if (shouldDisable) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  };

  useEffect(() => {
    if (isOpen) {
      toggleBodyScroll(true);
    }

    return () => {
      toggleBodyScroll(false);
    };
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

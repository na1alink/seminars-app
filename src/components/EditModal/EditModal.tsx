import React, { useState, useEffect } from "react";
import { Seminar } from "../../types";
import Modal from "../ui/Modal/Modal";
import Button from "../ui/Button/Button";
import styles from "./EditModal.module.scss";

interface EditModalProps {
  seminar: Seminar;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSeminar: Seminar) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  seminar,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(seminar.title);
  const [description, setDescription] = useState(seminar.description);
  const [date, setDate] = useState(seminar.date);
  const [time, setTime] = useState(seminar.time);
  const [speaker, setSpeaker] = useState(seminar.speaker || "");

  useEffect(() => {
    setTitle(seminar.title);
    setDescription(seminar.description);
    setDate(seminar.date);
    setTime(seminar.time);
    setSpeaker(seminar.speaker || "");
  }, [seminar]);

  const handleSave = () => {
    const updatedSeminar: Seminar = {
      ...seminar,
      title,
      description,
      date,
      time,
      speaker,
    };
    onSave(updatedSeminar);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.EditModal}>
        <h2 className={styles.EditModal__title}>Редактировать</h2>

        <div className={styles.EditModal__fields}>
          <input
            type="text"
            value={title}
            placeholder="Название семинара"
            onChange={(e) => setTitle(e.target.value)}
            className={styles.EditModal__input}
          />
          <textarea
            value={description}
            placeholder="Описание семинара"
            onChange={(e) => setDescription(e.target.value)}
            className={styles.EditModal__textarea}
          />
          <input
            type="text"
            value={date}
            placeholder="Дата семинара"
            onChange={(e) => setDate(e.target.value)}
            className={styles.EditModal__input}
          />
          <input
            type="text"
            value={time}
            placeholder="Время семинара"
            onChange={(e) => setTime(e.target.value)}
            className={styles.EditModal__input}
          />
          <input
            type="text"
            value={speaker}
            placeholder="Докладчик"
            onChange={(e) => setSpeaker(e.target.value)}
            className={styles.EditModal__input}
          />
        </div>
        <div className={styles.EditModal__block}>
          <Button onClick={handleSave}>Сохранить</Button>
          <Button variant="secondary" onClick={onClose}>
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;

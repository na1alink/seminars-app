import React, { useState } from "react";
import { Seminar } from "../../types";
import EditModal from "../EditModal/EditModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import styles from "./SeminarItem.module.scss";
import Button from "../ui/Button/Button";

interface SeminarItemProps {
  seminar: Seminar;
  onDelete: (id: number) => void;
  onUpdate: (updatedSeminar: Seminar) => void;
}

const SeminarItem: React.FC<SeminarItemProps> = ({
  seminar,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // удаление семинар
  const handleDelete = (id: number) => {
    fetch(`http://localhost:3001/seminars/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDelete(id);
        }
      })
      .catch((error) => {
        console.error("Error deleting seminar:", error);
      });
  };

  // сохранение изменений
  const handleSave = (updatedSeminar: Seminar) => {
    fetch(`http://localhost:3001/seminars/${updatedSeminar.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSeminar),
    })
      .then((response) => {
        if (response.ok) {
          onUpdate(updatedSeminar);
        }
      })
      .catch((error) => {
        console.error("Error updating seminar:", error);
      });
  };

  return (
    <div className={styles.SeminarItem}>
      <img
        src={seminar.photo}
        alt={seminar.title}
        className={styles.SeminarItem__image}
      />

      <div className={styles.SeminarItem__content}>
        <h2 className={styles.SeminarItem__title}>{seminar.title}</h2>
        <p className={styles.SeminarItem__description}>{seminar.description}</p>
        <p className={styles.SeminarItem__date}>Дата: {seminar.date}</p>
        <p className={styles.SeminarItem__time}>Время: {seminar.time}</p>
        {seminar.speaker && (
          <p className={styles.SeminarItem__speaker}>
            Докладчик: {seminar.speaker}
          </p>
        )}
        <div className={styles.SeminarItem__block}>
          <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
          <Button onClick={() => setIsConfirmModalOpen(true)}>Удалить</Button>
        </div>
      </div>

      {isEditing && (
        <EditModal
          seminar={seminar}
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => handleDelete(seminar.id)}
      />
    </div>
  );
};

export default SeminarItem;

import React, { useEffect } from "react";
import styles from "./Notification.module.scss";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 5000); // Закрытие через 5 секунд

    return () => clearTimeout(timeoutId); // Очистка таймера при размонтировании
  }, [onClose]);

  return (
    <div
      className={`${styles.Notification} ${styles[`Notification--${type}`]}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Notification;

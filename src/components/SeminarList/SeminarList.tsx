import React, { useEffect, useState } from "react";
import { Seminar } from "../../types";
import SeminarItem from "../SeminarItem/SeminarItem";
import styles from "./SeminarList.module.scss";
import ErrorFallback from "../ErrorFallback/ErrorFallback";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const SeminarList: React.FC = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSeminars = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/seminars");
      if (!response.ok) {
        throw new Error("Не удалось загрузить список семинаров");
      }
      const data: Seminar[] = await response.json();
      setSeminars(data);
      setError(null);
    } catch (err) {
      console.error("Ошибка при загрузке семинаров:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Произошла неизвестная ошибка");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeminars(); //получение данных при монтировании компонента
  }, []);

  // повторная попытка загрузки
  const handleRetry = () => {
    fetchSeminars();
  };

  const handleDelete = (id: number) => {
    setSeminars((prevSeminars) =>
      prevSeminars.filter((seminar) => seminar.id !== id)
    );
  };

  const handleUpdate = (updatedSeminar: Seminar) => {
    setSeminars((prevSeminars) =>
      prevSeminars.map((seminar) =>
        seminar.id === updatedSeminar.id ? updatedSeminar : seminar
      )
    );
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <ErrorFallback
        onRetry={handleRetry}
        errorMessage={
          error.includes("Failed to fetch")
            ? "Сервер недоступен. Пожалуйста, попробуйте позже"
            : "Произошла ошибка при загрузке данных"
        }
      />
    );
  }

  if (seminars.length === 0) {
    return <div className={styles.SeminarList__empty}>Список пуст</div>;
  }

  return (
    <div className={styles.SeminarList}>
      {seminars.map((seminar) => (
        <SeminarItem
          key={seminar.id}
          seminar={seminar}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default SeminarList;

import React from "react";
import Button from "../ui/Button/Button";
import styles from "./ErrorFallback.module.scss";

interface ErrorFallbackProps {
  onRetry: () => void; //  повторная попытка загрузки
  errorMessage?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  onRetry,
  errorMessage,
}) => {
  return (
    <div className={styles.ErrorFallback}>
      <p>{errorMessage}</p>
      <Button onClick={onRetry}>Попробовать снова</Button>
    </div>
  );
};

export default ErrorFallback;

import React from "react";
import styles from "./LoadingIndicator.module.scss";

const LoadingIndicator: React.FC = () => {
  return (
    <div className={styles.LoadingIndicator}>
      <div className={styles.LoadingIndicator__spinner}></div>
      <p>Загрузка...</p>
    </div>
  );
};

export default LoadingIndicator;

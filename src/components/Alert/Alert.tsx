import React from 'react';
import styles from './Alert.module.css';

type AlertProps = {
  message: string;
  type: 'success' | 'error';
};

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  return (
    <div
      className={`${styles.alert} ${
        type === 'error' ? styles.error : styles.success
      }`}
      role={type === 'error' ? 'alert' : 'status'}
    >
      {message}
    </div>
  );
};

export default Alert;

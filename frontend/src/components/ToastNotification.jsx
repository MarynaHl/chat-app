import React from 'react';
import './App.css';

const ToastNotification = ({ message }) => {
  if (!message) return null;

  return (
    <div className="toast-notification">
      {message}
    </div>
  );
};

export default ToastNotification;

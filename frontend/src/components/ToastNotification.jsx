import React from 'react';

const ToastNotification = ({ message }) => {
  if (!message) return null;

  return (
    <div className="toast-notification">
      <p>{message}</p>
    </div>
  );
};

export default ToastNotification;

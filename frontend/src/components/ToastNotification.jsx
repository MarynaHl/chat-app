import React from 'react';

const ToastNotification = ({ message }) => {
  if (!message) return null;

  return (
    <div className="toast-notification">
      {message}
    </div>
  );
};

export default ToastNotification;

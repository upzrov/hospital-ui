import React from 'react';
import '~/styles/components/ErrorNotification.scss';

interface ErrorNotificationProps {
  message: string | null;
  onClose: () => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
  onClose,
}) => {
  if (!message) return null;

  return (
    <div className="error-notification">
      <div className="error-notification__content">
        <span className="error-notification__message">{message}</span>
        <button className="error-notification__close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

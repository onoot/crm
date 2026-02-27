// client\src\contex\NotificationService.js
import React, { createContext, useContext, useState, useEffect } from 'react';
const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

const MiniNotification = ({ notification, onClose, duration = 5000 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (notification.type === 'error') return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [notification, onClose, duration]);

  if (!notification) return null;

  const getIconContent = () => {
    switch (notification.type) {
      case 'success': return '✓';
      case 'error': return '×';
      case 'warning': return '!';
      case 'info': return 'i';
      default: return 'i';
    }
  };

  const getIconClass = () => {
    switch (notification.type) {
      case 'success': return 'mini-notification-icon success';
      case 'error': return 'mini-notification-icon error';
      case 'warning': return 'mini-notification-icon warning';
      case 'info': return 'mini-notification-icon info';
      default: return 'mini-notification-icon info';
    }
  };

  const getTitle = () => {
    if (notification.title) return notification.title;
    switch (notification.type) {
      case 'success': return "Успех";
      case 'error': return "Ошибка";
      case 'warning': return "Внимание";
      case 'info': return "Предупреждение";
      default: return "По умолчанию";
    }
  };

  return (
    <div className="mini-notification-container">
      <div className={`mini-notification ${notification.type}`}>
        <button 
          className="mini-notification-close"
          onClick={onClose}
          aria-label={""}
        >
          ×
        </button>
        
        <div className="mini-notification-header">
          <div className={getIconClass()}>
            {getIconContent()}
          </div>
          <h3 className="mini-notification-title">
            {getTitle()}
          </h3>
        </div>
        
        <div className="mini-notification-message">
          {notification.message}
        </div>
        
        <div className="mini-notification-progress-bar-container">
          <div 
            className="mini-notification-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const FullNotification = ({ notification, onClose }) => {
  if (!notification) return null;

  const getIconContent = () => {
    switch (notification.type.replace('full-', '')) {
      case 'success': return '✓';
      case 'error': return '×';
      case 'warning': return '!';
      case 'info': return 'i';
      default: return 'i';
    }
  };

  const getIconClass = () => {
    const baseType = notification.type.replace('full-', '');
    switch (baseType) {
      case 'success': return 'full-notification-icon success';
      case 'error': return 'full-notification-icon error';
      case 'warning': return 'full-notification-icon warning';
      case 'info': return 'full-notification-icon info';
      default: return 'full-notification-icon info';
    }
  };

  const getTitle = () => {
    if (notification.title) return notification.title;
    const baseType = notification.type.replace('full-', '');
    switch (baseType) {
      case 'success': return "success";
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  return (
    <div className="full-notification-overlay" onClick={onClose}>
      <div className="full-notification-popup" onClick={e => e.stopPropagation()}>
        <button 
          className="full-notification-close"
          onClick={onClose}
          aria-label={""}
        >
          ×
        </button>
        
        <div className="full-notification-icon-wrapper">
          <div className={getIconClass()}>
            {getIconContent()}
          </div>
        </div>
        
        <h2 className="full-notification-title">
          {getTitle()}
        </h2>
        
        <div className="full-notification-message">
          {notification.message}
        </div>
        
        <div className="full-notification-actions">
          <button
            className="full-notification-button"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const Notification = ({ notification, onClose }) => {
  if (!notification) return null;

  if (notification.type.startsWith('full-')) {
    return <FullNotification notification={notification} onClose={onClose} />;
  } else {
    return <MiniNotification notification={notification} onClose={onClose} />;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message, title = '') => {
    setNotification({ type, message, title });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (notification && !notification.type.startsWith('full-') && notification.type !== 'error') {
      const timer = setTimeout(() => {
        hideNotification();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <Notification notification={notification} onClose={hideNotification} />
    </NotificationContext.Provider>
  );
};
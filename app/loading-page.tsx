import React from 'react';
import './loading.scss';

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ fullScreen = false, message }) => {
  return (
    <div className={`loading-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="loading-spinner">
        <div className="spinner" />
        {message && <p className="loading-message">{message}</p>}
      </div>
    </div>
  );
};

export default Loading;

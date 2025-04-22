import React from 'react';
import './loading.scss';

interface LoadingProps {
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ fullScreen = false }) => {
  return (
    <div className={`loading-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="loading">
        <div className="loading-circle"></div>
      </div>
    </div>
  );
};

export default Loading; 
import React from 'react';
import './Spinner.scss';

interface SpinnerProps {
  fullScreen?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ fullScreen = false }) => {
  return (
    <div className={`spinner-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="spinner">
        <div className="spinner-circle"></div>
      </div>
    </div>
  );
};

export default Spinner; 
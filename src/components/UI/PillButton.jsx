import React from 'react';

export const PillButton = ({ children, onClick, className = '', title, id }) => {
  return (
    <div
      id={id}
      className={`btn pill-btn ${className}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </div>
  );
};

export default PillButton;

import React from 'react';

export const CircleButton = ({ children, onClick, className = '', title, id, style }) => {
  return (
    <div
      id={id}
      className={`btn circle-btn ${className}`}
      onClick={onClick}
      title={title}
      style={style}
    >
      {children}
    </div>
  );
};

export const SmallCircleButton = ({ children, onClick, className = '', title, id, dataAttr }) => {
  return (
    <div
      id={id}
      className={`btn small-circle-btn ${className}`}
      onClick={onClick}
      title={title}
      {...dataAttr}
    >
      {children}
    </div>
  );
};

export default CircleButton;

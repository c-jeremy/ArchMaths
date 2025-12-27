import React from 'react';

export const Slider = ({ value, onChange, min, max, step, id, className = '' }) => {
  return (
    <input
      type="range"
      id={id}
      className={`slider ${className}`}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
    />
  );
};

export default Slider;

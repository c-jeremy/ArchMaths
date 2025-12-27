import React from 'react';

export const ToggleSwitch = ({ checked, onChange, id, className = '' }) => {
  return (
    <label className={`dev-mode-label ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id}
      />
      <span className="custom-switch">
        <span className="custom-switch-track"></span>
        <span className="custom-switch-handle"></span>
      </span>
    </label>
  );
};

export default ToggleSwitch;

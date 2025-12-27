import React from 'react';

const KeyboardPage1 = ({ onKeyPress }) => {
  const keys = [
    ['x', 'y', 't', ',', '7', '8', '9', '÷', '←'],
    ['(', ')', '<', '>', '4', '5', '6', '×', '→'],
    ['abs(', 'exp(', 'sqrt(', 'z', '1', '2', '3', '-', 'del'],
    ['sgn(', '^', 'log(', 'ln(', '0', '.', '=', '+', 'enter']
  ];

  return (
    <div id="keyboard-page-1" className="keyboard-page-content active">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => {
            const isGroupSeparator = (rowIndex === 0 && keyIndex === 4) ||
                                    (rowIndex === 1 && keyIndex === 4) ||
                                    (rowIndex === 2 && keyIndex === 4) ||
                                    (rowIndex === 3 && keyIndex === 4);
            const isArrow = key === '←' || key === '→';
            const isDelEnter = key === 'del' || key === 'enter';

            return (
              <div
                key={keyIndex}
                className={`btn ${isArrow ? 'keyboard-arrow-color' : isDelEnter ? 'keyboard-del-enter-color' : 'keyboard-default-color'} ${isGroupSeparator ? 'key-group-separator' : ''}`}
                data-key={key}
                onClick={() => onKeyPress(key)}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default KeyboardPage1;

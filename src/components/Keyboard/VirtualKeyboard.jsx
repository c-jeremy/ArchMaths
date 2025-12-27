import React, { useState } from 'react';
import { useUIState } from '../../contexts/UIStateContext';
import { useEngine } from '../../contexts/EngineContext';
import { PillButton } from '../UI/PillButton';
import { CircleButton, SmallCircleButton } from '../UI/CircleButton';
import KeyboardPage1 from './KeyboardPage1';
import KeyboardPage2 from './KeyboardPage2';
import KeyboardPage3 from './KeyboardPage3';
import KeyboardPage4 from './KeyboardPage4';

const VirtualKeyboard = () => {
  const { keyboardVisible, hideKeyboard, showKeyboard } = useUIState();
  const { getEngine } = useEngine();
  const [activePage, setActivePage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleKeyPress = (key) => {
    if (key === 'del') {
      if (cursorPosition > 0) {
        const newValue = inputValue.slice(0, cursorPosition - 1) + inputValue.slice(cursorPosition);
        setInputValue(newValue);
        setCursorPosition(cursorPosition - 1);
      }
    } else if (key === 'enter') {
      const engine = getEngine();
      if (engine && inputValue.trim()) {
        engine.addEntry(inputValue);
        setInputValue('');
        setCursorPosition(0);
      }
      hideKeyboard();
    } else if (key === '←') {
      if (cursorPosition > 0) {
        setCursorPosition(cursorPosition - 1);
      }
    } else if (key === '→') {
      if (cursorPosition < inputValue.length) {
        setCursorPosition(cursorPosition + 1);
      }
    } else {
      const newValue = inputValue.slice(0, cursorPosition) + key + inputValue.slice(cursorPosition);
      setInputValue(newValue);
      setCursorPosition(cursorPosition + key.length);
    }
  };

  return (
    <>
      <div id="keyboard-toggle-container">
        <PillButton
          id="keyboard-toggle-btn"
          className="main-ui-btn-color"
          onClick={() => keyboardVisible ? hideKeyboard() : showKeyboard()}
        >
          <img src="" alt="add" className="keyboard-toggle-icon" />
          <span className="keyboard-toggle-text">输入表达式</span>
        </PillButton>
        <CircleButton id="category-filter-btn" title="分类筛选">
          <img id="category-filter-icon" src="" style={{ width: '20px', height: '20px' }} />
        </CircleButton>
      </div>

      <div id="keyboard" style={{ display: keyboardVisible ? 'block' : 'none' }}>
        <div id="keyboard-input-area-container">
          <div className="keyboard-page-nav">
            {[1, 2, 3, 4].map(page => (
              <SmallCircleButton
                key={page}
                className={`keyboard-default-color keyboard-page-btn ${activePage === page ? 'active' : ''}`}
                dataAttr={{ 'data-kpage': page }}
                onClick={() => setActivePage(page)}
              >
                {page}
              </SmallCircleButton>
            ))}
          </div>
          <div id="keyboard-input-display">{inputValue}</div>
          <PillButton id="keyboard-copy-btn" className="keyboard-default-color">
            <img src="" style={{ width: '20px', height: '20px' }} alt="copy" />
          </PillButton>
          <PillButton id="keyboard-paste-btn" className="keyboard-default-color">
            <img src="" style={{ width: '20px', height: '20px' }} alt="paste" />
          </PillButton>
          <PillButton id="keyboard-input-prompt-btn" className="keyboard-default-color">
            <img src="" style={{ width: '20px', height: '20px' }} alt="prompt" />
          </PillButton>
        </div>

        <div className="keyboard-pages-container">
          <div style={{ display: activePage === 1 ? 'block' : 'none' }}>
            <KeyboardPage1 onKeyPress={handleKeyPress} />
          </div>
          <div style={{ display: activePage === 2 ? 'block' : 'none' }}>
            <KeyboardPage2 onKeyPress={handleKeyPress} />
          </div>
          <div style={{ display: activePage === 3 ? 'block' : 'none' }}>
            <KeyboardPage3 onKeyPress={handleKeyPress} />
          </div>
          <div style={{ display: activePage === 4 ? 'block' : 'none' }}>
            <KeyboardPage4 onKeyPress={handleKeyPress} />
          </div>
        </div>
      </div>
    </>
  );
};

export default VirtualKeyboard;

import { useState, useCallback } from 'react';

export const useKeyboard = () => {
  const [inputValue, setInputValue] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  const insertAtCursor = useCallback((text) => {
    const before = inputValue.substring(0, cursorPosition);
    const after = inputValue.substring(cursorPosition);
    const newValue = before + text + after;
    setInputValue(newValue);
    setCursorPosition(cursorPosition + text.length);
  }, [inputValue, cursorPosition]);

  const deleteAtCursor = useCallback(() => {
    if (cursorPosition > 0) {
      const before = inputValue.substring(0, cursorPosition - 1);
      const after = inputValue.substring(cursorPosition);
      setInputValue(before + after);
      setCursorPosition(cursorPosition - 1);
    }
  }, [inputValue, cursorPosition]);

  const moveCursor = useCallback((direction) => {
    if (direction === 'left' && cursorPosition > 0) {
      setCursorPosition(cursorPosition - 1);
    } else if (direction === 'right' && cursorPosition < inputValue.length) {
      setCursorPosition(cursorPosition + 1);
    }
  }, [cursorPosition, inputValue.length]);

  const clearInput = useCallback(() => {
    setInputValue('');
    setCursorPosition(0);
  }, []);

  return {
    inputValue,
    cursorPosition,
    setInputValue,
    setCursorPosition,
    insertAtCursor,
    deleteAtCursor,
    moveCursor,
    clearInput
  };
};

export default useKeyboard;

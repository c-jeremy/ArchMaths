import React, { createContext, useState, useContext } from 'react';

const UIStateContext = createContext();

export const UIStateProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePanel, setActivePanel] = useState('plot');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isPortraitMode, setIsPortraitMode] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(360);
  const [activeEntryId, setActiveEntryId] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const showKeyboard = (entryId = null) => {
    setKeyboardVisible(true);
    if (entryId) setActiveEntryId(entryId);
  };

  const hideKeyboard = () => {
    setKeyboardVisible(false);
    setActiveEntryId(null);
  };

  return (
    <UIStateContext.Provider value={{
      isSidebarOpen,
      activePanel,
      keyboardVisible,
      isPortraitMode,
      sidebarWidth,
      activeEntryId,
      setActivePanel,
      toggleSidebar,
      openSidebar,
      closeSidebar,
      showKeyboard,
      hideKeyboard,
      setIsPortraitMode,
      setSidebarWidth,
      setActiveEntryId
    }}>
      {children}
    </UIStateContext.Provider>
  );
};

export const useUIState = () => {
  const context = useContext(UIStateContext);
  if (!context) {
    throw new Error('useUIState must be used within UIStateProvider');
  }
  return context;
};

export default UIStateContext;

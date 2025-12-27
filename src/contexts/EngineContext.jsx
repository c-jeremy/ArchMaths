import React, { createContext, useContext, useRef, useState } from 'react';

const EngineContext = createContext();

export const EngineProvider = ({ children }) => {
  const engineRef = useRef(null);
  const [isEngineReady, setIsEngineReady] = useState(false);

  const initializeEngine = (canvasElement) => {
    if (window.ArchMathEngine && canvasElement) {
      engineRef.current = new window.ArchMathEngine(canvasElement);
      setIsEngineReady(true);
      return engineRef.current;
    }
    return null;
  };

  const getEngine = () => engineRef.current;

  return (
    <EngineContext.Provider value={{
      engineRef,
      isEngineReady,
      initializeEngine,
      getEngine
    }}>
      {children}
    </EngineContext.Provider>
  );
};

export const useEngine = () => {
  const context = useContext(EngineContext);
  if (!context) {
    throw new Error('useEngine must be used within EngineProvider');
  }
  return context;
};

export default EngineContext;

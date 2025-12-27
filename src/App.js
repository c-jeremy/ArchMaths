import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { UIStateProvider } from './contexts/UIStateContext';
import { EngineProvider } from './contexts/EngineContext';
import MainLayout from './components/MainLayout';
import './assets/styles/variables.css';
import './assets/styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <UIStateProvider>
        <EngineProvider>
          <MainLayout />
        </EngineProvider>
      </UIStateProvider>
    </ThemeProvider>
  );
}

export default App;

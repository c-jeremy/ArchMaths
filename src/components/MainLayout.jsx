import React from 'react';
import { useUIState } from '../contexts/UIStateContext';
import SidebarContainer from './Sidebar/SidebarContainer';
import CanvasContainer from './Canvas/CanvasContainer';
import VirtualKeyboard from './Keyboard/VirtualKeyboard';
import FloatingControls from './Canvas/FloatingControls';
import { CircleButton } from './UI/CircleButton';

const MainLayout = () => {
  const { isSidebarOpen, openSidebar } = useUIState();

  return (
    <div className={`app-container ${!isSidebarOpen ? 'sidebar-hidden' : ''}`}>
      <div id="top-blur-mask"></div>
      <span id="file-name-display">Arch Graph 1</span>

      <FloatingControls />

      <div className="main-layout">
        <SidebarContainer />
        <CanvasContainer />
      </div>

      <CircleButton
        id="show-sidebar-btn"
        title="展开侧栏"
        onClick={openSidebar}
      >
        <img src="" alt="show sidebar" />
      </CircleButton>

      <VirtualKeyboard />
    </div>
  );
};

export default MainLayout;

import React from 'react';
import { useUIState } from '../../contexts/UIStateContext';
import SidebarNavigation from './SidebarNavigation';
import PlotPanel from './Panels/PlotPanel';
import GeometryPanel from './Panels/GeometryPanel';
import CodePanel from './Panels/CodePanel';
import SettingsPanel from './Panels/SettingsPanel';
import FilePanel from './Panels/FilePanel';
import AboutPanel from './Panels/AboutPanel';

const SidebarContainer = () => {
  const { activePanel } = useUIState();

  return (
    <>
      <SidebarNavigation />
      <div id="sidebar-background">
        <div id="sidebar-content">
          <div style={{ display: activePanel === 'plot' ? 'block' : 'none' }}>
            <PlotPanel />
          </div>
          <div style={{ display: activePanel === 'geometry' ? 'block' : 'none' }}>
            <GeometryPanel />
          </div>
          <div style={{ display: activePanel === 'code' ? 'block' : 'none' }}>
            <CodePanel />
          </div>
          <div style={{ display: activePanel === 'settings' ? 'block' : 'none' }}>
            <SettingsPanel />
          </div>
          <div style={{ display: activePanel === 'file' ? 'block' : 'none' }}>
            <FilePanel />
          </div>
          <div style={{ display: activePanel === 'about' ? 'block' : 'none' }}>
            <AboutPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarContainer;

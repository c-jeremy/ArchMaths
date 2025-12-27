import React from 'react';
import { useUIState } from '../../contexts/UIStateContext';

const SidebarNavigation = () => {
  const { activePanel, setActivePanel, closeSidebar } = useUIState();

  return (
    <div id="sidebar-nav-buttons">
      <div className="nav-group-top">
        <div
          id="nav-btn-plot"
          className={`btn sidebar-nav-btn ${activePanel === 'plot' ? 'active' : ''}`}
          title="绘图"
          onClick={() => setActivePanel('plot')}
        >
          <img src="" alt="plot" />
        </div>
        <div
          id="nav-btn-geometry"
          className={`btn sidebar-nav-btn ${activePanel === 'geometry' ? 'active' : ''}`}
          title="几何"
          onClick={() => setActivePanel('geometry')}
        >
          <img src="" alt="geometry" />
        </div>
        <div
          id="nav-btn-code"
          className={`btn sidebar-nav-btn ${activePanel === 'code' ? 'active' : ''}`}
          title="代码"
          onClick={() => setActivePanel('code')}
        >
          <img src="" alt="code" style={{ width: '20px', height: '20px' }} />
        </div>
      </div>
      <div className="nav-group-bottom">
        <div
          id="nav-btn-about"
          className={`btn sidebar-nav-btn ${activePanel === 'about' ? 'active' : ''}`}
          title="关于"
          onClick={() => setActivePanel('about')}
        >
          <img src="" alt="about" />
        </div>
        <div
          id="nav-btn-file"
          className={`btn sidebar-nav-btn ${activePanel === 'file' ? 'active' : ''}`}
          title="文件"
          onClick={() => setActivePanel('file')}
        >
          <img src="" alt="file" />
        </div>
        <div
          id="nav-btn-settings"
          className={`btn sidebar-nav-btn ${activePanel === 'settings' ? 'active' : ''}`}
          title="设置"
          onClick={() => setActivePanel('settings')}
        >
          <img src="" alt="settings" />
        </div>
        <div
          id="nav-btn-collapse"
          className="btn sidebar-nav-btn"
          title="收起侧栏"
          onClick={closeSidebar}
        >
          <img src="" alt="collapse" />
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;

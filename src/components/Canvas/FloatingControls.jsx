import React, { useState, useCallback } from 'react';
import { useEngine } from '../../contexts/EngineContext';

const FloatingControls = () => {
  const { getEngine, isEngineReady } = useEngine();
  const [is3DMode, setIs3DMode] = useState(false);
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);

  const handleResetView = useCallback(() => {
    const engine = getEngine();
    if (engine) {
      if (engine.is3DMode) {
        // Reset 3D view
        if (engine.camera3D) {
          engine.camera3D.theta = Math.PI / 4;
          engine.camera3D.phi = Math.PI / 3;
          engine.camera3D.rho = 10;
        }
        engine.scale3D = 1;
        engine.offset3D = { x: 0, y: 0 };
        engine.center3D = { x: 0, y: 0, z: 0 };
        if (engine.recalculate3D) engine.recalculate3D();
      } else {
        // Reset 2D view
        engine.scale = 50;
        const canvas = engine.canvas;
        if (canvas) {
          engine.offset = {
            x: canvas.width / (2 * window.devicePixelRatio),
            y: canvas.height / (2 * window.devicePixelRatio)
          };
        }
        if (engine.recalculateAll) engine.recalculateAll();
      }
      if (engine.requestDraw) engine.requestDraw();
    }
  }, [getEngine]);

  const handleToggle3DMode = useCallback(() => {
    const engine = getEngine();
    if (engine) {
      const newMode = !engine.is3DMode;
      engine.is3DMode = newMode;
      setIs3DMode(newMode);

      if (newMode) {
        // Entering 3D mode
        if (engine.recalculate3D) engine.recalculate3D();
      } else {
        // Exiting 3D mode
        if (engine.recalculateAll) engine.recalculateAll();
      }
      if (engine.requestDraw) engine.requestDraw();
    }
  }, [getEngine]);

  const handleToggleEditMode = useCallback(() => {
    const engine = getEngine();
    if (engine) {
      const newMode = !isEditMode;
      setIsEditMode(newMode);
      // Toggle edit mode in engine if available
      if (engine.setEditMode) {
        engine.setEditMode(newMode);
      }
    }
  }, [getEngine, isEditMode]);

  const handleEnterAnnotationMode = useCallback(() => {
    const engine = getEngine();
    if (engine) {
      const newMode = !isAnnotationMode;
      setIsAnnotationMode(newMode);
      if (engine.setAnnotationMode) {
        engine.setAnnotationMode(newMode);
      }
    }
  }, [getEngine, isAnnotationMode]);

  return (
    <>
      <div id="stop-trace-btn" title="停止录制" style={{ display: 'none' }}>
        <img src="" alt="stop trace" />
      </div>

      <div id="stage-mode-toggle-btn" title="多存档调度" style={{ display: 'none' }}></div>

      <div
        id="view-mode-toggle-circle"
        onClick={handleToggle3DMode}
        style={{ cursor: 'pointer' }}
        title={is3DMode ? '切换到2D模式' : '切换到3D模式'}
      >
        {is3DMode ? '2D' : '3D'}
      </div>

      <div
        id="reset-view-btn"
        title="重置视角"
        onClick={handleResetView}
        style={{ cursor: 'pointer' }}
      >
        <span style={{ fontSize: '16px' }}>⟲</span>
      </div>

      <div id="annotation-split-btn">
        <div
          id="anno-split-left"
          className="anno-split-part"
          title="开启/关闭编辑"
          onClick={handleToggleEditMode}
          style={{ cursor: 'pointer' }}
        >
          <span style={{ fontSize: '14px' }}>{isEditMode ? '✏️' : '🔒'}</span>
        </div>
        <div className="anno-split-separator"></div>
        <div
          id="anno-split-right"
          className="anno-split-part"
          title="进入批注模式"
          onClick={handleEnterAnnotationMode}
          style={{ cursor: 'pointer' }}
        >
          <span style={{ fontSize: '14px' }}>{isAnnotationMode ? '📝' : '✍️'}</span>
        </div>
      </div>
    </>
  );
};

export default FloatingControls;

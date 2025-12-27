import React, { useState, useEffect, useCallback } from 'react';
import { useEngine } from '../../../contexts/EngineContext';

const SettingsPanel = () => {
  const { getEngine, isEngineReady } = useEngine();
  const [activeSettingsPanel, setActiveSettingsPanel] = useState('appearance');
  const [gridStyle, setGridStyle] = useState('grid');

  useEffect(() => {
    if (!isEngineReady) return;

    const engine = getEngine();
    if (!engine) return;

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle && engine.applyDarkMode) {
      darkModeToggle.addEventListener('change', (e) => engine.applyDarkMode(e.target.checked));
    }

    // Window transparency toggle
    const transparencyToggle = document.getElementById('window-transparency-toggle');
    if (transparencyToggle && engine.applyTransparency) {
      transparencyToggle.addEventListener('change', (e) => engine.applyTransparency(e.target.checked));
    }

    // Color inversion toggle
    const colorInversionToggle = document.getElementById('color-inversion-toggle');
    if (colorInversionToggle) {
      colorInversionToggle.addEventListener('change', (e) => {
        engine.colorInversionEnabled = e.target.checked;
        if (engine.requestDraw) engine.requestDraw();
      });
    }

    // Overlay drawing toggle
    const overlayDrawingToggle = document.getElementById('overlay-drawing-toggle');
    if (overlayDrawingToggle) {
      overlayDrawingToggle.addEventListener('change', (e) => {
        engine.overlayDrawingEnabled = e.target.checked;
        if (engine.clearPlotData) engine.clearPlotData();
        if (engine.recalculateAll) engine.recalculateAll();
        if (engine.requestDraw) engine.requestDraw();
      });
    }

    // Performance mode toggle
    const performanceModeToggle = document.getElementById('performance-mode-toggle');
    if (performanceModeToggle) {
      performanceModeToggle.checked = engine.performanceModeEnabled || false;
      performanceModeToggle.addEventListener('change', (e) => {
        engine.performanceModeEnabled = e.target.checked;
        if (!engine.performanceModeEnabled && engine.isZooming) {
          if (engine.restoreOriginalPrecisions) engine.restoreOriginalPrecisions();
          engine.isZooming = false;
          if (engine.clearPlotData) engine.clearPlotData();
          if (engine.recalculateAll) engine.recalculateAll();
        }
      });
    }

    // Low precision buffer toggle
    const lowPrecisionBufferToggle = document.getElementById('low-precision-buffer-toggle');
    if (lowPrecisionBufferToggle) {
      lowPrecisionBufferToggle.addEventListener('change', (e) => {
        engine.lowPrecisionBufferEnabled = e.target.checked;
      });
    }

    // High performance plotting toggle
    const highPerformancePlottingToggle = document.getElementById('high-performance-plotting-toggle');
    if (highPerformancePlottingToggle) {
      highPerformancePlottingToggle.addEventListener('change', (e) => {
        engine.highPerformancePlottingEnabled = e.target.checked;
        engine.lineWidth = engine.highPerformancePlottingEnabled ? 1 : 2;
        if (engine.clearPlotData) engine.clearPlotData();
        if (engine.requestDraw) engine.requestDraw();
      });
    }

    // Show axes toggle
    const showAxesToggle = document.getElementById('show-axes-toggle');
    if (showAxesToggle) {
      showAxesToggle.addEventListener('change', (e) => {
        engine.showAxes = e.target.checked;
        if (engine.requestDraw) engine.requestDraw();
      });
    }

    // Show axis numbers toggle
    const showAxisNumbersToggle = document.getElementById('show-axis-numbers-toggle');
    if (showAxisNumbersToggle) {
      showAxisNumbersToggle.addEventListener('change', (e) => {
        engine.showAxisNumbers = e.target.checked;
        if (engine.requestDraw) engine.requestDraw();
      });
    }

    // Grid style buttons
    const gridStyleButtons = document.getElementById('grid-style-buttons');
    if (gridStyleButtons) {
      gridStyleButtons.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (btn) {
          engine.gridStyle = btn.dataset.style;
          setGridStyle(btn.dataset.style);
          if (engine.requestDraw) engine.requestDraw();
        }
      });
    }

    // Show point labels toggle
    const showPointLabelsToggle = document.getElementById('show-point-labels-toggle');
    if (showPointLabelsToggle) {
      showPointLabelsToggle.addEventListener('change', (e) => {
        engine.showPointLabels = e.target.checked;
        if (engine.requestDraw) engine.requestDraw();
      });
    }

    // Show hidden math toggle
    const showHiddenMathToggle = document.getElementById('show-hidden-math-toggle');
    if (showHiddenMathToggle) {
      showHiddenMathToggle.addEventListener('change', (e) => {
        engine.showHiddenMath = e.target.checked;
        if (engine.requestDraw) engine.requestDraw();
      });
    }

    // Show hidden geo toggle
    const showHiddenGeoToggle = document.getElementById('show-hidden-geo-toggle');
    if (showHiddenGeoToggle) {
      showHiddenGeoToggle.addEventListener('change', (e) => {
        engine.showHiddenGeo = e.target.checked;
        if (engine.requestDraw) engine.requestDraw();
      });
    }

    // Auto breakpoint detection toggle
    const autoBreakpointDetectionToggle = document.getElementById('auto-breakpoint-detection-toggle');
    if (autoBreakpointDetectionToggle) {
      autoBreakpointDetectionToggle.addEventListener('change', (e) => {
        engine.autoBreakpointDetectionEnabled = e.target.checked;
        if (engine.clearPlotData) engine.clearPlotData();
        if (engine.requestDraw) engine.requestDraw();
      });
    }

    // Adaptive extend toggle
    const adaptiveExtendToggle = document.getElementById('adaptive-extend-toggle');
    if (adaptiveExtendToggle) {
      adaptiveExtendToggle.addEventListener('change', (e) => {
        engine.adaptiveExtendEnabled = e.target.checked;
        if (engine.clearPlotData) engine.clearPlotData();
        if (engine.requestDraw) engine.requestDraw();
      });
    }

    // Geometry snap toggle
    const geometrySnapToggle = document.getElementById('geometry-snap-toggle');
    if (geometrySnapToggle) {
      geometrySnapToggle.addEventListener('change', (e) => {
        engine.geometrySnapEnabled = e.target.checked;
      });
    }

    // Adaptive plotting toggle
    const adaptivePlottingToggle = document.getElementById('adaptive-plotting-toggle');
    if (adaptivePlottingToggle) {
      adaptivePlottingToggle.addEventListener('change', (e) => {
        engine.adaptivePlottingEnabled = e.target.checked;
        if (engine.clearPlotData) engine.clearPlotData();
        if (engine.requestDraw) engine.requestDraw();
      });
    }

    // Geometry measurement display toggle
    const geometryMeasurementDisplayToggle = document.getElementById('geometry-measurement-display-toggle');
    if (geometryMeasurementDisplayToggle) {
      geometryMeasurementDisplayToggle.addEventListener('change', (e) => {
        engine.geometryMeasurementDisplayEnabled = e.target.checked;
        if (engine.updateGeometryMeasurementDisplay) engine.updateGeometryMeasurementDisplay();
      });
    }

    // Smooth panning toggle
    const smoothPanningToggle = document.getElementById('smooth-panning-toggle');
    if (smoothPanningToggle) {
      smoothPanningToggle.addEventListener('change', (e) => {
        engine.smoothPanningEnabled = e.target.checked;
        if (!engine.smoothPanningEnabled && engine.isSmoothPanningActive) {
          engine.isSmoothPanningActive = false;
          if (engine.finalizePanInteraction) engine.finalizePanInteraction();
        }
      });
    }
  }, [isEngineReady, getEngine]);

  return (
    <div id="settings-panel" className="sidebar-panel">
      <div className="settings-from-core-wrapper">
        <div className="settings-nav-buttons">
          <div
            className={`settings-nav-btn ${activeSettingsPanel === 'appearance' ? 'active' : ''}`}
            data-panel="appearance"
            onClick={() => setActiveSettingsPanel('appearance')}
          >
            <img src="" alt="外观" />
            <span className="settings-nav-text">外观</span>
          </div>
          <div
            className={`settings-nav-btn ${activeSettingsPanel === 'performance' ? 'active' : ''}`}
            data-panel="performance"
            onClick={() => setActiveSettingsPanel('performance')}
          >
            <img src="" alt="性能" />
            <span className="settings-nav-text">性能</span>
          </div>
          <div
            className={`settings-nav-btn ${activeSettingsPanel === 'coords' ? 'active' : ''}`}
            data-panel="coords"
            onClick={() => setActiveSettingsPanel('coords')}
          >
            <img src="" alt="坐标系" />
            <span className="settings-nav-text">坐标系</span>
          </div>
          <div
            className={`settings-nav-btn ${activeSettingsPanel === 'features' ? 'active' : ''}`}
            data-panel="features"
            onClick={() => setActiveSettingsPanel('features')}
          >
            <img src="" alt="功能" />
            <span className="settings-nav-text">功能</span>
          </div>
        </div>

        <div
          id="settings-panel-appearance"
          className={`settings-panel-content ${activeSettingsPanel === 'appearance' ? 'active' : ''}`}
          style={{ display: activeSettingsPanel === 'appearance' ? 'block' : 'none' }}
        >
          <div className="settings-item-row">
            <label htmlFor="dark-mode-toggle">
              <img src="" className="settings-item-icon" alt="" />
              深色模式
            </label>
            <label className="custom-switch-container">
              <input type="checkbox" id="dark-mode-toggle" />
              <span className="custom-switch">
                <span className="custom-switch-track"></span>
                <span className="custom-switch-handle"></span>
              </span>
            </label>
          </div>
          <div className="settings-item">
            <div className="settings-item-row">
              <label htmlFor="window-transparency-toggle">
                <img src="" className="settings-item-icon" alt="" />
                启用窗口透明度
              </label>
              <label className="custom-switch-container">
                <input type="checkbox" id="window-transparency-toggle" defaultChecked />
                <span className="custom-switch">
                  <span className="custom-switch-track"></span>
                  <span className="custom-switch-handle"></span>
                </span>
              </label>
            </div>
            <p className="settings-comment">可能会降低性能</p>
          </div>
          <div className="settings-item-row">
            <label htmlFor="color-inversion-toggle">
              <img src="" className="settings-item-icon" alt="" />
              颜色反转
            </label>
            <label className="custom-switch-container">
              <input type="checkbox" id="color-inversion-toggle" />
              <span className="custom-switch">
                <span className="custom-switch-track"></span>
                <span className="custom-switch-handle"></span>
              </span>
            </label>
          </div>
        </div>

        <div
          id="settings-panel-performance"
          className={`settings-panel-content ${activeSettingsPanel === 'performance' ? 'active' : ''}`}
          style={{ display: activeSettingsPanel === 'performance' ? 'block' : 'none' }}
        >
          <div className="settings-item">
            <div className="settings-item-row">
              <label htmlFor="overlay-drawing-toggle">
                <img src="" className="settings-item-icon" alt="" />
                2D/3D叠加绘图
              </label>
              <label className="custom-switch-container">
                <input type="checkbox" id="overlay-drawing-toggle" />
                <span className="custom-switch">
                  <span className="custom-switch-track"></span>
                  <span className="custom-switch-handle"></span>
                </span>
              </label>
            </div>
            <p className="settings-comment">在3d模式绘制2d对象，在2d模式绘制3d对象</p>
          </div>
          <div className="settings-item">
            <div className="settings-item-row">
              <label htmlFor="performance-mode-toggle">
                <img src="" className="settings-item-icon" alt="" />
                高性能缩放
              </label>
              <label className="custom-switch-container">
                <input type="checkbox" id="performance-mode-toggle" />
                <span className="custom-switch">
                  <span className="custom-switch-track"></span>
                  <span className="custom-switch-handle"></span>
                </span>
              </label>
            </div>
            <p className="settings-comment">以图片缓存显示坐标系，缩放更流畅</p>
          </div>
          <div className="settings-item">
            <div className="settings-item-row">
              <label htmlFor="high-performance-plotting-toggle">
                <img src="" className="settings-item-icon" alt="" />
                高性能绘图
              </label>
              <label className="custom-switch-container">
                <input type="checkbox" id="high-performance-plotting-toggle" />
                <span className="custom-switch">
                  <span className="custom-switch-track"></span>
                  <span className="custom-switch-handle"></span>
                </span>
              </label>
            </div>
            <p className="settings-comment">对于线条密集的图像，通过绘制细线条，提升绘图性能和清晰度</p>
          </div>
          <div className="settings-item">
            <div className="settings-item-row">
              <label htmlFor="low-precision-buffer-toggle">
                <img src="" className="settings-item-icon" alt="" />
                低精度缓冲
              </label>
              <label className="custom-switch-container">
                <input type="checkbox" id="low-precision-buffer-toggle" />
                <span className="custom-switch">
                  <span className="custom-switch-track"></span>
                  <span className="custom-switch-handle"></span>
                </span>
              </label>
            </div>
            <p className="settings-comment">以较低精度缩放或播放动画，提高流畅度</p>
          </div>
        </div>

        <div
          id="settings-panel-coords"
          className={`settings-panel-content ${activeSettingsPanel === 'coords' ? 'active' : ''}`}
          style={{ display: activeSettingsPanel === 'coords' ? 'block' : 'none' }}
        >
          <div className="settings-item-row">
            <label htmlFor="show-axes-toggle">
              <img src="" className="settings-item-icon" alt="" />
              显示坐标轴
            </label>
            <label className="custom-switch-container">
              <input type="checkbox" id="show-axes-toggle" defaultChecked />
              <span className="custom-switch">
                <span className="custom-switch-track"></span>
                <span className="custom-switch-handle"></span>
              </span>
            </label>
          </div>
          <div className="settings-item-row">
            <label htmlFor="show-axis-numbers-toggle">
              <img src="" className="settings-item-icon" alt="" />
              显示轴编号
            </label>
            <label className="custom-switch-container">
              <input type="checkbox" id="show-axis-numbers-toggle" defaultChecked />
              <span className="custom-switch">
                <span className="custom-switch-track"></span>
                <span className="custom-switch-handle"></span>
              </span>
            </label>
          </div>
          <div className="settings-item">
            <label>
              <img src="" className="settings-item-icon" alt="" />
              网格样式
            </label>
            <div className="button-group" id="grid-style-buttons">
              <button data-style="hidden" className={gridStyle === 'hidden' ? 'active' : ''}>隐藏</button>
              <button data-style="grid" className={gridStyle === 'grid' ? 'active' : ''}>网格</button>
              <button data-style="dots" className={gridStyle === 'dots' ? 'active' : ''}>格点</button>
              <button data-style="polar" className={gridStyle === 'polar' ? 'active' : ''}>极坐标</button>
            </div>
          </div>
          <div className="settings-item-row">
            <label htmlFor="show-point-labels-toggle">
              <img src="" className="settings-item-icon" alt="" />
              显示点的名称
            </label>
            <label className="custom-switch-container">
              <input type="checkbox" id="show-point-labels-toggle" defaultChecked />
              <span className="custom-switch">
                <span className="custom-switch-track"></span>
                <span className="custom-switch-handle"></span>
              </span>
            </label>
          </div>
          <div className="settings-item-row">
            <label htmlFor="show-hidden-math-toggle">
              <img src="" className="settings-item-icon" alt="" />
              显示隐藏的数学对象
            </label>
            <label className="custom-switch-container">
              <input type="checkbox" id="show-hidden-math-toggle" />
              <span className="custom-switch">
                <span className="custom-switch-track"></span>
                <span className="custom-switch-handle"></span>
              </span>
            </label>
          </div>
          <div className="settings-item-row">
            <label htmlFor="show-hidden-geo-toggle">
              <img src="" className="settings-item-icon" alt="" />
              显示隐藏的几何对象
            </label>
            <label className="custom-switch-container">
              <input type="checkbox" id="show-hidden-geo-toggle" />
              <span className="custom-switch">
                <span className="custom-switch-track"></span>
                <span className="custom-switch-handle"></span>
              </span>
            </label>
          </div>
        </div>

        <div
          id="settings-panel-features"
          className={`settings-panel-content ${activeSettingsPanel === 'features' ? 'active' : ''}`}
          style={{ display: activeSettingsPanel === 'features' ? 'block' : 'none' }}
        >
          <div className="settings-item">
            <div className="settings-item-row">
              <label htmlFor="adaptive-plotting-toggle">
                <img src="" className="settings-item-icon" alt="" />
                自适应绘图
              </label>
              <label className="custom-switch-container">
                <input type="checkbox" id="adaptive-plotting-toggle" defaultChecked />
                <span className="custom-switch">
                  <span className="custom-switch-track"></span>
                  <span className="custom-switch-handle"></span>
                </span>
              </label>
            </div>
            <p className="settings-comment">根据函数变化率自动调节绘图精度，适用于部分显函数</p>
          </div>
          <div className="settings-item">
            <div className="settings-item-row">
              <label htmlFor="adaptive-extend-toggle">
                <img src="" className="settings-item-icon" alt="" />
                自动延伸断点
              </label>
              <label className="custom-switch-container">
                <input type="checkbox" id="adaptive-extend-toggle" defaultChecked />
                <span className="custom-switch">
                  <span className="custom-switch-track"></span>
                  <span className="custom-switch-handle"></span>
                </span>
              </label>
            </div>
            <p className="settings-comment">自动延伸断点上下图像，可能出现误判</p>
          </div>
          <div className="settings-item-row">
            <label htmlFor="auto-breakpoint-detection-toggle">
              <img src="" className="settings-item-icon" alt="" />
              自动断点判断
            </label>
            <label className="custom-switch-container">
              <input type="checkbox" id="auto-breakpoint-detection-toggle" />
              <span className="custom-switch">
                <span className="custom-switch-track"></span>
                <span className="custom-switch-handle"></span>
              </span>
            </label>
          </div>
          <div className="settings-item-row">
            <label htmlFor="geometry-snap-toggle">
              <img src="" className="settings-item-icon" alt="" />
              几何智能吸附
            </label>
            <label className="custom-switch-container">
              <input type="checkbox" id="geometry-snap-toggle" />
              <span className="custom-switch">
                <span className="custom-switch-track"></span>
                <span className="custom-switch-handle"></span>
              </span>
            </label>
          </div>
          <div className="settings-item-row">
            <label htmlFor="geometry-measurement-display-toggle">
              <img src="" className="settings-item-icon" alt="" />
              几何度量显示
            </label>
            <label className="custom-switch-container">
              <input type="checkbox" id="geometry-measurement-display-toggle" />
              <span className="custom-switch">
                <span className="custom-switch-track"></span>
                <span className="custom-switch-handle"></span>
              </span>
            </label>
          </div>
          <div className="settings-item">
            <div className="settings-item-row">
              <label htmlFor="smooth-panning-toggle">
                <img src="" className="settings-item-icon" alt="" />
                丝滑移动
              </label>
              <label className="custom-switch-container">
                <input type="checkbox" id="smooth-panning-toggle" />
                <span className="custom-switch">
                  <span className="custom-switch-track"></span>
                  <span className="custom-switch-handle"></span>
                </span>
              </label>
            </div>
            <p className="settings-comment">划动或缩放后提供惯性反馈</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;

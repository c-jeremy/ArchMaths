import React, { useCallback, useRef } from 'react';
import { PillButton } from '../../UI/PillButton';
import { useEngine } from '../../../contexts/EngineContext';

const FilePanel = () => {
  const { getEngine } = useEngine();
  const fileInputRef = useRef(null);
  const jsInputRef = useRef(null);

  const handleNewFile = useCallback(() => {
    const engine = getEngine();
    if (engine) {
      if (window.confirm('确定要创建新文件吗？当前未保存的内容将会丢失。')) {
        // Clear all entries
        if (engine.entries) {
          engine.entries.length = 0;
        }
        // Reset view
        engine.scale = 50;
        if (engine.canvas) {
          engine.offset = {
            x: engine.canvas.width / (2 * window.devicePixelRatio),
            y: engine.canvas.height / (2 * window.devicePixelRatio)
          };
        }
        // Clear variables
        if (engine.variables) {
          engine.variables.clear();
        }
        // Update UI
        if (engine.updateEntryList) engine.updateEntryList();
        if (engine.clearPlotData) engine.clearPlotData();
        if (engine.requestDraw) engine.requestDraw();
      }
    }
  }, [getEngine]);

  const handleLoadFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelected = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const engine = getEngine();
    if (!engine) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        // Load entries
        if (data.entries && engine.entries) {
          engine.entries.length = 0;
          data.entries.forEach(entry => {
            if (engine.addEntry) {
              engine.addEntry(entry.expr || entry.name);
            }
          });
        }

        // Load view settings
        if (data.scale !== undefined) engine.scale = data.scale;
        if (data.offset) engine.offset = data.offset;
        if (data.is3DMode !== undefined) engine.is3DMode = data.is3DMode;

        // Update UI
        if (engine.updateEntryList) engine.updateEntryList();
        if (engine.recalculateAll) engine.recalculateAll();
        if (engine.requestDraw) engine.requestDraw();

        alert('文件加载成功！');
      } catch (err) {
        alert('加载文件失败：' + err.message);
      }
    };
    reader.readAsText(file);

    // Reset input
    event.target.value = '';
  }, [getEngine]);

  const handleSaveFile = useCallback(() => {
    const engine = getEngine();
    if (!engine) return;

    const data = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      entries: engine.entries?.map(entry => ({
        type: entry.type,
        expr: entry.expr,
        name: entry.name,
        color: entry.color,
        visible: entry.visible,
        value: entry.value,
        min: entry.min,
        max: entry.max,
        step: entry.step
      })) || [],
      scale: engine.scale,
      offset: engine.offset,
      is3DMode: engine.is3DMode
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `archmaths_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [getEngine]);

  const handleLoadJsOperator = useCallback(() => {
    jsInputRef.current?.click();
  }, []);

  const handleJsFileSelected = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const engine = getEngine();
    if (!engine) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsCode = e.target.result;
        // Execute the JS code to define custom operators
        const func = new Function('engine', jsCode);
        func(engine);
        alert('JS运算符加载成功！');
      } catch (err) {
        alert('加载JS运算符失败：' + err.message);
      }
    };
    reader.readAsText(file);

    // Reset input
    event.target.value = '';
  }, [getEngine]);

  return (
    <div id="file-panel" className="sidebar-panel">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".json"
        onChange={handleFileSelected}
      />
      <input
        type="file"
        ref={jsInputRef}
        style={{ display: 'none' }}
        accept=".js"
        onChange={handleJsFileSelected}
      />
      <div className="menu-file-page-buttons">
        <div className="main-actions-group">
          <PillButton
            id="new-file-btn"
            className="blue-pill-btn"
            style={{ gap: '8px' }}
            onClick={handleNewFile}
          >
            <span style={{ fontSize: '16px' }}>📄</span>
            <span>创建文件</span>
          </PillButton>
          <PillButton
            id="load-file-btn"
            className="blue-pill-btn"
            style={{ gap: '8px' }}
            onClick={handleLoadFile}
          >
            <span style={{ fontSize: '16px' }}>📂</span>
            <span>加载存档</span>
          </PillButton>
          <PillButton
            id="save-file-btn"
            className="blue-pill-btn"
            style={{ gap: '8px' }}
            onClick={handleSaveFile}
          >
            <span style={{ fontSize: '16px' }}>💾</span>
            <span>保存存档</span>
          </PillButton>
          <PillButton
            id="load-js-op-btn"
            className="blue-pill-btn"
            onClick={handleLoadJsOperator}
          >
            加载js运算符
          </PillButton>
        </div>
        <div className="example-actions-group">
          {/* Example actions will go here */}
        </div>
      </div>
    </div>
  );
};

export default FilePanel;

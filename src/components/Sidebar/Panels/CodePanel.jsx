import React, { useState } from 'react';
import { PillButton } from '../../UI/PillButton';
import { SmallCircleButton } from '../../UI/CircleButton';

const CodePanel = () => {
  const [isEditorView, setIsEditorView] = useState(false);
  const [codeName, setCodeName] = useState('');
  const [codeParams, setCodeParams] = useState('');
  const [codeBody, setCodeBody] = useState('');

  return (
    <div id="code-panel" className="sidebar-panel">
      {!isEditorView ? (
        <div id="code-list-view">
          <div id="code-entry-list"></div>
          <div className="code-panel-actions">
            <PillButton
              id="code-new-btn"
              className="main-ui-btn-color"
              style={{ gap: '8px' }}
              onClick={() => setIsEditorView(true)}
            >
              <img src="" alt="新建" style={{ width: '20px', height: '20px' }} />
              <span>新建</span>
            </PillButton>
            <PillButton
              id="code-upload-btn"
              className="main-ui-btn-color"
              style={{ gap: '8px' }}
            >
              <img src="" alt="上传" style={{ width: '20px', height: '20px' }} />
              <span>上传</span>
            </PillButton>
          </div>
        </div>
      ) : (
        <div id="code-editor-view">
          <SmallCircleButton
            id="code-editor-exit-btn"
            className="main-ui-btn-color"
            onClick={() => setIsEditorView(false)}
          >
            <img src="" alt="退出" style={{ width: '12px', height: '12px' }} />
          </SmallCircleButton>
          <div className="code-editor-content">
            <div className="code-editor-input-group">
              <label htmlFor="code-editor-name">名称:</label>
              <input
                type="text"
                id="code-editor-name"
                className="code-editor-input"
                value={codeName}
                onChange={(e) => setCodeName(e.target.value)}
              />
            </div>
            <div className="code-editor-input-group">
              <label htmlFor="code-editor-params">变量:</label>
              <input
                type="text"
                id="code-editor-params"
                className="code-editor-input"
                placeholder="例如: 'a', 'b'"
                value={codeParams}
                onChange={(e) => setCodeParams(e.target.value)}
              />
            </div>
            <div className="code-editor-input-group code-editor-input-group-large">
              <label htmlFor="code-editor-body">代码:</label>
              <textarea
                id="code-editor-body"
                className="code-editor-textarea"
                value={codeBody}
                onChange={(e) => setCodeBody(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="code-panel-actions">
            <PillButton
              id="code-add-btn"
              className="blue-pill-btn"
              style={{ gap: '8px' }}
            >
              <img src="" alt="添加" style={{ width: '20px', height: '20px' }} />
              <span>添加</span>
            </PillButton>
            <PillButton
              id="code-download-btn"
              className="blue-pill-btn"
              style={{ gap: '8px' }}
            >
              <img src="" alt="下载" style={{ width: '20px', height: '20px' }} />
              <span>下载</span>
            </PillButton>
          </div>
        </div>
      )}
      <PillButton id="global-script-toggle-btn">全局脚本</PillButton>
      <div id="global-script-view" style={{ display: 'none' }}>
        {/* Global script view content */}
      </div>
    </div>
  );
};

export default CodePanel;

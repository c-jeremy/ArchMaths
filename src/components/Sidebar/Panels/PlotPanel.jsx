import React, { useState, useEffect, useCallback } from 'react';
import { useEngine } from '../../../contexts/EngineContext';

const EntryItem = ({ entry, index, onDelete, onToggleVisibility, onToggleExpand, onEdit }) => {
  const getEntryClasses = () => {
    const classes = ['entry-item'];
    if (entry.type === 'variable' && entry.isEditableIndependent) {
      classes.push('variable-item');
    } else if (['function', 'geometry', 'text'].includes(entry.type)) {
      if (!entry.visible) classes.push('function-hidden');
    } else if (['custom_function_definition', 'advanced_custom_function_definition'].includes(entry.type)) {
      classes.push(entry.type.replace(/_/g, '-') + '-item');
    }
    if (entry.expanded) classes.push('expanded');
    return classes.join(' ');
  };

  const getDisplayText = () => {
    if (entry.type === 'text') {
      return `// ${entry.content || ''}`;
    }
    if (entry.type === 'variable' && entry.isEditableIndependent) {
      const displayValue = Number.isFinite(entry.value) ? entry.value.toFixed(4) : '...';
      return `${entry.name} = ${displayValue}`;
    }
    if (entry.type === 'variable' && !entry.isEditableIndependent) {
      const displayValue = Number.isFinite(entry.value) ? entry.value.toPrecision(4) : '...';
      return `${entry.expr} → ${displayValue}`;
    }
    return entry.expr || entry.name || 'Entry';
  };

  const getEntryStyle = () => {
    if (['function', 'geometry', 'text', 'point_list'].includes(entry.type) && entry.color) {
      const entryVisibleOpacity = entry.visible ? 1 : 0.3;
      return {
        '--entry-visible-opacity': entryVisibleOpacity,
        borderLeftColor: entry.visible ? `hsl(${entry.color.h * 3.6}, ${entry.color.s}%, ${entry.color.b}%)` : 'rgba(128,128,128,0.4)',
        borderLeftWidth: '3px',
        borderLeftStyle: 'solid'
      };
    }
    return {};
  };

  return (
    <div
      className={getEntryClasses()}
      data-entry-index={index}
      style={getEntryStyle()}
    >
      <div className="entry-main-row">
        <div className="entry-text-area" onClick={() => onToggleExpand(index)}>
          <div className="entry-expr">
            {getDisplayText()}
          </div>
          {entry.compilationError && (
            <span className="entry-error">({entry.compilationError})</span>
          )}
          {entry.type === 'geometry' && entry.detailsString && (
            <div className="entry-details">{entry.detailsString}</div>
          )}
        </div>
        <div className="entry-actions-new">
          {entry.type !== 'text' && ['function', 'geometry', 'point_list'].includes(entry.type) && (
            <span
              className="action-btn visibility-toggle-btn"
              title="显示/隐藏"
              onClick={() => onToggleVisibility(index)}
            >
              {entry.visible ? '👁' : '👁‍🗨'}
            </span>
          )}
          <span
            className="action-btn edit-btn"
            title="编辑"
            onClick={() => onEdit(index)}
          >
            ✏️
          </span>
          <span
            className="action-btn delete-btn"
            title="删除"
            onClick={() => onDelete(index)}
          >
            🗑️
          </span>
        </div>
      </div>

      {entry.type === 'variable' && entry.isEditableIndependent && (
        <div className="variable-slider-wrapper">
          <input
            type="range"
            min={entry.min || 0}
            max={entry.max || 10}
            step={entry.step || 0.01}
            value={entry.value || 0}
            className="variable-slider"
            onChange={(e) => {
              entry.value = parseFloat(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};

const PlotPanel = () => {
  const { getEngine, isEngineReady } = useEngine();
  const [entries, setEntries] = useState([]);

  const refreshEntries = useCallback(() => {
    const engine = getEngine();
    if (engine && engine.entries) {
      setEntries([...engine.entries]);
    }
  }, [getEngine]);

  useEffect(() => {
    if (!isEngineReady) return;

    const engine = getEngine();
    if (!engine) return;

    // Initial load of entries
    refreshEntries();

    // Store the original updateEntryList method
    const originalUpdateEntryList = engine.updateEntryList;

    // Override to also update React state
    engine.updateEntryList = function() {
      if (originalUpdateEntryList) {
        originalUpdateEntryList.call(this);
      }
      refreshEntries();
    };

    return () => {
      // Restore original method on cleanup
      if (engine && originalUpdateEntryList) {
        engine.updateEntryList = originalUpdateEntryList;
      }
    };
  }, [isEngineReady, getEngine, refreshEntries]);

  const handleDelete = useCallback((index) => {
    const engine = getEngine();
    if (engine && engine.removeEntry) {
      engine.removeEntry(index);
      refreshEntries();
    }
  }, [getEngine, refreshEntries]);

  const handleToggleVisibility = useCallback((index) => {
    const engine = getEngine();
    if (engine && engine.entries && engine.entries[index]) {
      engine.entries[index].visible = !engine.entries[index].visible;
      if (engine.requestDraw) engine.requestDraw();
      refreshEntries();
    }
  }, [getEngine, refreshEntries]);

  const handleToggleExpand = useCallback((index) => {
    const engine = getEngine();
    if (engine && engine.entries && engine.entries[index]) {
      engine.entries[index].expanded = !engine.entries[index].expanded;
      refreshEntries();
    }
  }, [getEngine, refreshEntries]);

  const handleEdit = useCallback((index) => {
    const engine = getEngine();
    if (engine && engine.entries && engine.entries[index]) {
      const entry = engine.entries[index];
      const newExpr = prompt('编辑表达式:', entry.expr || '');
      if (newExpr !== null && newExpr !== entry.expr) {
        if (engine.editEntry) {
          engine.editEntry(index, newExpr);
        }
        refreshEntries();
      }
    }
  }, [getEngine, refreshEntries]);

  return (
    <div id="entry-list" className="sidebar-panel">
      {entries.length === 0 ? (
        <div className="entry-list-empty">
          点击下方按钮添加表达式
        </div>
      ) : (
        entries.map((entry, index) => (
          <EntryItem
            key={index}
            entry={entry}
            index={index}
            onDelete={handleDelete}
            onToggleVisibility={handleToggleVisibility}
            onToggleExpand={handleToggleExpand}
            onEdit={handleEdit}
          />
        ))
      )}
    </div>
  );
};

export default PlotPanel;

import React, { useRef, useEffect } from 'react';
import { useEngine } from '../../contexts/EngineContext';

const CanvasContainer = () => {
  const canvasRef = useRef(null);
  const { initializeEngine } = useEngine();

  useEffect(() => {
    if (canvasRef.current) {
      initializeEngine(canvasRef.current);
    }
  }, [initializeEngine]);

  return (
    <div id="canvas-container">
      <canvas ref={canvasRef} id="main-canvas"></canvas>
      <div id="fps-display"></div>
      <div id="info-display"></div>
    </div>
  );
};

export default CanvasContainer;

import React, { useRef, useEffect, useState } from "react";
import "./Board.css";

export default function Board() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      setHistory([]); // Reset history on resize
      setRedoStack([]);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const saveState = () => {
      if (!ctx) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory((prev) => [...prev, imageData]);
      setRedoStack([]); // Clear redo stack on new draw
    };

    const startDrawing = (e: MouseEvent) => {
      drawingRef.current = true;
      saveState();
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      ctx.beginPath();
      ctx.moveTo(
        (e.clientX - rect.left) * scaleX,
        (e.clientY - rect.top) * scaleY
      );
    };

    const draw = (e: MouseEvent) => {
      if (!drawingRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      ctx.lineTo(
        (e.clientX - rect.left) * scaleX,
        (e.clientY - rect.top) * scaleY
      );
      ctx.stroke();
    };

    const stopDrawing = () => {
      drawingRef.current = false;
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };
  }, []);

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHistory([]); // Reset history
    setRedoStack([]);
  };

  const undo = () => {
    if (!canvasRef.current || history.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setRedoStack((prev) => [history[history.length - 1], ...prev]);
    setHistory((prev) => prev.slice(0, -1));
    if (history.length > 1) {
      ctx.putImageData(history[history.length - 2], 0, 0);
    } else {
      clearCanvas();
    }
  };

  const redo = () => {
    if (!canvasRef.current || redoStack.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const nextState = redoStack[0];
    setRedoStack((prev) => prev.slice(1));
    setHistory((prev) => [...prev, nextState]);
    ctx.putImageData(nextState, 0, 0);
  };

  return (
    <div className="container">
      <div className="toolbar">
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={undo} disabled={history.length === 0}>
          Undo
        </button>
        <button onClick={redo} disabled={redoStack.length === 0}>
          Redo
        </button>
      </div>
      <div className="main-board">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

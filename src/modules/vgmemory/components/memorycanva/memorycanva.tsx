import useCanvasMemory from "@vgmemory/hooks/useCanvasMemory";
import { useEffect, useRef } from "react";
import styles from "@vgmemory/styles/memorycanvas.module.css";

const MemoryCanvas = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasMemoryhook = useCanvasMemory({ containerRef, canvasRef });

  useEffect(() => {
    canvasMemoryhook.initCanvas();
    canvasMemoryhook.createInitialMemoryBlocks();
  }, []);

  return (
    <div className={styles["canvas-container"]} ref={containerRef}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
export default MemoryCanvas;

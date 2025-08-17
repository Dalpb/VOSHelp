import useCanvasMemory from "@vgmemory/hooks/useCanvasMemory";
import { useEffect, useRef } from "react";
import styles from "@vgmemory/styles/memorycanvas.module.css";
import useActionStore from "@vgmemory/store/useActionsStore";

interface Props {
  init: boolean;
}
const MemoryCanvas = ({ init }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasMemoryhook = useCanvasMemory({ containerRef, canvasRef });
  const { currentLineAction,actions } = useActionStore();
  useEffect(() => {
    if (!init) return;
    canvasMemoryhook.initCanvas();
    canvasMemoryhook.createInitialMemoryBlocks();
  }, [init]);

  useEffect(() => {
    if (!init || currentLineAction != -1) return;
    const i = currentLineAction;
    const action = actions[i].action;
    canvasMemoryhook.ManageCanvasDrawAction(action);
  }, [currentLineAction]);

  return (
    <div className={styles["canvas-container"]} ref={containerRef}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
export default MemoryCanvas;

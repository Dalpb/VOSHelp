import Memory from "@vgmemory/canvas/memory";
import type { RefObject } from "react";

interface Props {
  containerRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}
interface ReturnProps {
  initCanvas: () => void;
  createBlockMemory: () => void;
}
const useCanvasMemory = ({ containerRef, canvasRef }: Props): ReturnProps => {
  let canvas;
  let container;
  let width 
  let height 
  let ctx : CanvasRenderingContext2D | null |undefined 

  //incializa el canvas y espacio limite
  const initCanvas = () => {
    canvas = canvasRef.current;
    container = containerRef.current;
    width = container?.clientWidth;
    height = container?.clientHeight;
    console.log(width, height);
    ctx = canvas?.getContext("2d");
    console.log(ctx);
  };

  //dibujará un bloque de memoria
  const createBlockMemory = () => {
    const memory = new Memory(0, 0, 60, 110, "NULL");
    if (ctx) {
      memory.draw(ctx);
    }
  };

  return {
    initCanvas,
    createBlockMemory,
  };
};

export default useCanvasMemory;

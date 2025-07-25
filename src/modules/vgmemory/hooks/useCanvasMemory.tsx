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
  //el pincel
  let ctx : CanvasRenderingContext2D | null |undefined 

  const initCanvas = () => {
    canvas = canvasRef.current;
    container = containerRef.current;
    //dimensión de mi espacio campas :D
    width = container?.clientWidth;
    height = container?.clientHeight;
    console.log(width, height);

    //el pincel
    ctx = canvas?.getContext("2d");
    console.log(ctx);
  };
  const createBlockMemory = () => {
    const memory = new Memory(0, 0, 100, 150, "");
    if (ctx) {
      console.log("entro");
      memory.draw(ctx);
    }
  };

  return {
    initCanvas,
    createBlockMemory,
  };
};

export default useCanvasMemory;

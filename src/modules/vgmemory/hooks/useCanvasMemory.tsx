import Arrow from "@vgmemory/canvas/arrow";
import Header from "@vgmemory/canvas/header";
import Memory from "@vgmemory/canvas/memory";
import Variable from "@vgmemory/canvas/variable";
import { useRef, type RefObject } from "react";

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
  const ctxRef = useRef<CanvasRenderingContext2D | null |undefined>(null)

  //incializa el canvas y espacio limite
  const initCanvas = () => {
    canvas = canvasRef.current;
    container = containerRef.current;
    if(!canvas || !container){
      console.error("Error: elemento canvas o contener de canvas no renderizados");
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;
    //me falto definir canvas su altura y anchura
    canvas.width = width;
    canvas.height = height;
    ctxRef.current = canvas.getContext("2d");
  };

  //dibujará un bloque de memoria
  const createBlockMemory = () => {
    let ctx = ctxRef.current;
    const memory = new Header(0,0,110,100,"","base")
    const row1 = new Arrow({x:620,y:100},{x:200,y:250});
    if (ctx) {
      memory.draw(ctx);
      row1.draw(ctx);
    }
  };

  return {
    initCanvas,
    createBlockMemory,
  };
};

export default useCanvasMemory;

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
  createInitialMemoryBlocks: () => void;
}
const useCanvasMemory = ({ containerRef, canvasRef }: Props): ReturnProps => {
  let canvas;
  let container;
  const ctxRef = useRef<CanvasRenderingContext2D | null | undefined>(null);

  //incializa el canvas y espacio limite
  const initCanvas = () => {
    canvas = canvasRef.current;
    container = containerRef.current;
    if (!canvas || !container) {
      console.error(
        "Error: elemento canvas o contener de canvas no renderizados"
      );
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;
    //me falto definir canvas su altura y anchura
    canvas.width = width;
    canvas.height = height;
    ctxRef.current = canvas.getContext("2d");
  };

  //la estructura basica al iniciar simulacion
  const createInitialMemoryBlocks = () => {
    let ctx = ctxRef.current;
    if (!ctx) {
      console.error("Pincel ctx, nulo");
      return;
    }
    const base = new Header(10, 10, 110, 100, "", "base");
    const spaceNull = new Memory(290, 10, 40, 70, "NULL");
    const freep = new Variable(150, 10, 90, 80, "0x000", "*freep");
    const row = new Arrow({x:290,y:15},{x:230,y:15})
    base.draw(ctx);
    spaceNull.draw(ctx);
    freep.draw(ctx);
    row.draw(ctx);
  };

  return {
    initCanvas,
    createInitialMemoryBlocks,
  };
};

export default useCanvasMemory;

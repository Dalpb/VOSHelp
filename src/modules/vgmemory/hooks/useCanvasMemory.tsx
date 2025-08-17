import Arrow from "@vgmemory/canvas/arrow";
import Header from "@vgmemory/canvas/header";
import Memory from "@vgmemory/canvas/memory";
import Variable from "@vgmemory/canvas/variable";
import { useEffect, useRef, useState, type RefObject } from "react";
import {
  DIR_BASE,
  DIR_FREEP,
  DIR_NULL,
  DIR_BP,
  DIR_CP,
  DIR_P,
  DIR_P2,
  DIR_PREVP,
  DIR_UP,
} from "@vgmemory/Algorithm/xmalloc";
import useMemoryStore from "@vgmemory/store/useMemoryStore";
import type {
  ActionsT,
  HeaderContent,
  MemoryContent,
  VariableContent,
} from "@vgmemory/types/actions";
interface Props {
  containerRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}
interface ReturnProps {
  initCanvas: () => void;
  createInitialMemoryBlocks: () => void;
  ManageCanvasDrawAction: (action: ActionsT) => void;
}

interface Block{
  x: number,
  y:number,
  w: number,
  h: number
}



const useCanvasMemory = ({ containerRef, canvasRef }: Props): ReturnProps => {
  let canvas: HTMLCanvasElement | null;
  let container;
  const ctxRef = useRef<CanvasRenderingContext2D | null | undefined>(null);
  const [lastPostEspecial, setLastPostEspecial] = useState<{
    x: number;
    y: number;
  }>({ x: -1, y: -1 });

  //memorys
  const { setMemory, memoryMap } = useMemoryStore();

  const isEspecialSpace = (dir: number) =>
    [ DIR_BASE, DIR_BP, DIR_CP,
      DIR_FREEP,
      DIR_P,
      DIR_P2,
      DIR_PREVP,
      DIR_UP,
    ].some((d) => dir == d);

  //rota un x y Y considerando el width y heiht para colocar el componente
  
const findFreeSpaceCanvas = (dir: number, width: number, height: number,blocks: Array<Block>) => {
  const marginX = 2;
  const marginY = 20;

  const occupied = blocks;

  // Si es especial → primera fila
  if (isEspecialSpace(dir)) {
    const y = marginY;
    let x = marginX;

    while (true) {
      const overlaps = occupied.some(
        b =>
          x < b.x + b.w &&
          x + width > b.x &&
          y < b.y + b.h &&
          y + height > b.y
      );
      if (!overlaps) return { x, y };
      x += width + marginX;
    }
  }

  // Si no es especial → segunda fila en adelante
  let y = height + marginY * 2;
  let x = marginX;

  while (true) {
    const overlaps = occupied.some(
      b =>
        x < b.x + b.w &&
        x + width > b.x &&
        y < b.y + b.h &&
        y + height > b.y
    );
    if (!overlaps) return { x, y };

    x += width + marginX;

    // Pasar a la siguiente fila si no hay más espacio horizontal
    if (x + width > (canvas?.width || 0)) {
      x = marginX;
      y += height + marginY;
    }
  }
};


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
    const height = container.clientHeight; //me falto definir canvas su altura y anchura 
    canvas.width = width;
    canvas.height = height;
    ctxRef.current = canvas.getContext("2d");
  };

  //la estructura basica al iniciar simulacion, arreglar func fea
  const createInitialMemoryBlocks = () => {
    let ctx = ctxRef.current;
    if (!ctx) {
      console.error("Pincel ctx, nulo");
      return;
    }
    const blocks : Array<Block> = [] 
    let pos = findFreeSpaceCanvas(DIR_BASE, 110, 100,blocks);

    const base = new Header(DIR_BASE, pos.x, pos.y, 110, 100, "", "base", 0);
    setMemory(base);
    base.draw(ctx);
    blocks.push({x:base.getPosicionX(),y:base.getPosicionY(),w:base.getWidth(),h:base.getHeight()});
    pos = findFreeSpaceCanvas(DIR_FREEP,70,80,blocks);  
    
    const freep = new Variable(DIR_FREEP, pos.x, pos.y, 70, 80, "0x000", "*freep");
    
    setMemory(freep);
    freep.draw(ctx);
  };

  const ManageCanvasDrawAction = (action: ActionsT) => {
    if (action.type == "changeFile") return;
    switch (action.type) {
      case "create header":
        createHeaderCanvas(action.content);
        break;
      case "create memory":
        createMemoryCanvas(action.content);
        break;
      case "create variable":
        createVariableCanvas(action.content);
        break;
      case "pointing":
        const content = action.content;
        createArrowCanvas(content.dirRef, content.dirVar);
        break;
      case "update memory":
      case "update variable":
      case "update header":
      case "delete variable":
    }
  };

  const createHeaderCanvas = (contentH: HeaderContent) => {
    const { content, dir, name, size } = contentH;
    const ctx = ctxRef.current;
    if (!ctx) return;
    const header = new Header(dir, 50, 50, 110, 100, content, name, size);
    setMemory(header);
    header.draw(ctx);
  };
  const createMemoryCanvas = (contentM: MemoryContent) => {};
  const createVariableCanvas = (contentV: VariableContent) => {};
  const createArrowCanvas = (dirRef: number, dirVar: number) => {};

  //cosa que limpia todo a los dibujitos
  const clear = () => {};

  return {
    initCanvas,
    createInitialMemoryBlocks,
    ManageCanvasDrawAction,
  };
};

export default useCanvasMemory;

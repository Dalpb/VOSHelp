import useCanvasMemory from "@vgmemory/hooks/useCanvasMemory";
import { useEffect, useRef } from "react"

const MemoryCanvas = () =>{
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const canvasMemoryhook = useCanvasMemory({containerRef,canvasRef})

    useEffect(()=>{
        canvasMemoryhook.initCanvas();
        canvasMemoryhook.createBlockMemory();
    },[])
        
    return(
        <div ref={containerRef}>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}
export default MemoryCanvas;
import { useRef } from "react"

const MemoryCanvas = () =>{
    const containerCanva = useRef<HTMLDivElement | null>(null)

    return(
        <div ref={containerCanva}>
            <canvas></canvas>
        </div>
    )
}
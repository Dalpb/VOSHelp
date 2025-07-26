export const getWidthText = (ctx: CanvasRenderingContext2D,txt:string) : number => {
    const width = ctx.measureText(txt).width;
    return width;
}
export const getHeightText = (ctx:CanvasRenderingContext2D,txt:string): number =>{
    const {actualBoundingBoxAscent,actualBoundingBoxDescent} = ctx.measureText(txt);
    const height = actualBoundingBoxAscent +actualBoundingBoxDescent;
    return height;
}
export const centerTxtHorizontaly = (initX: number,endX : number,widthTxt:number) : number=>{
    if(endX > initX){
        console.error("Error en centrado: end es mayor a init");
        return 0;
    }
    const mid = (endX-initX)/2;
    const txtPos = mid - (widthTxt)/2;
    return txtPos;
}
export const centerTxtVerticaly = (initY : number,endY:number,heightTxt:number): number =>{
    const midY = (Math.abs(initY-endY))/2;
    const txtPos = midY + heightTxt/2;
    return txtPos;
}
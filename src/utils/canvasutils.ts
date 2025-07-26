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
    const mid = (endX+initX)/2;
    const txtPos = mid - (widthTxt)/2;
    return txtPos;
}
export const centerTxtVerticaly = (initY : number,endY:number,heightTxt:number): number =>{
    const midY = (endY+initY)/2;
    const txtPos = midY + heightTxt/2; //canvas tiene eje Y invertido -Y
    return txtPos;
}
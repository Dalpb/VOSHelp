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

//teorema de pitagoras
export const applyPitagoras = (opLeg:number,adLeg:number): number =>{
    const a = Math.pow(opLeg,2);
    const b = Math.pow(adLeg,2);
    const c = Math.sqrt(a+b);
    return c;
}
//angulo de inclinación en radianes
export const calculateAngle =(x1: number, y1: number, x2: number, y2: number): number => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angleRad = Math.atan2(dy, dx); 
  return angleRad;
}

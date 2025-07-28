import type { Node } from "@interfaces/Node";
import { applyPitagoras, calculateAngle } from "@utils/canvasutils";
class Arrow {
  private initPos: Node;
  private endPos: Node;
  private width: number = 2;
  private color: string;
  constructor(endPos: Node, starPos: Node, color: string = "#fff") {
    this.endPos = endPos;
    this.initPos = starPos;
    this.color = color;
  }

  //dead bruh
  private calculateDistance(): number {
    return applyPitagoras(
      this.endPos.x - this.initPos.x,
      this.endPos.y - this.initPos.y
    );
  }
  private calculateAngleRow(): number {
    return calculateAngle(
      this.initPos.x,
      this.initPos.y,
      this.endPos.x,
      this.endPos.y
    );
  }
  //mi amga
  private calculatePosArrow(
    h: number,
    alpha: number
  ): { posLeft: Node; posRight: Node } {
    const opLeg = h * Math.sin(alpha);
    const adLeg = h * Math.cos(alpha);
    const theta = this.calculateAngleRow();
    const w = Math.atan(opLeg / adLeg);
    const d1 = h;
    const { x, y } = this.endPos;
    const posLeft: Node = {
      x: x - d1 * Math.cos(theta + w),
      y: y - d1 * Math.sin(theta + w),
    };
    const posRight: Node = {
      x: x - d1 * Math.cos(theta - w),
      y: y - d1 * Math.sin(theta - w),
    };

    return { posLeft, posRight };
  }
  private drawTail(ctx:CanvasRenderingContext2D): void{
    ctx.beginPath();
    const r = 4;
    const theta = this.calculateAngleRow();
    const {x,y} = this.initPos;
    const opLeg = r * Math.sin(theta);
    const adLeg = r * Math.cos(theta); 
    const xCenter = x + adLeg;
    const yCenter = y +opLeg;
    ctx.arc(xCenter,yCenter,r,0,Math.PI*2);
    ctx.fillStyle ="aqua";
    ctx.fill();
    ctx.closePath();
  }

  private drawBody(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.initPos.x, this.initPos.y);
    ctx.lineTo(this.endPos.x, this.endPos.y);
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }
  private drawTop(ctx: CanvasRenderingContext2D): void {
    //solo considero angulo < 90 wasaaa
    //Revisando mi AMGA, debe haber ora forma
    const hypotenuse = 15; //tamaño del arrow
    const angle = Math.PI / 8;
    const { x, y } = this.endPos;
    const vertices = this.calculatePosArrow(hypotenuse, angle);
    const { posLeft, posRight } = vertices;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(posLeft.x, posLeft.y);
    ctx.lineTo(posRight.x, posRight.y);
    ctx.lineTo(x, y);
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    //ctx.clip();
    //ctx.fillStyle = this.color;
    //ctx.fillRect(this.endPos.x -rowL,this.endPos.y,rowL,rowL);
    //ctx.closePath();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.drawBody(ctx);
    this.drawTail(ctx);
    this.drawTop(ctx);
  }
}
export default Arrow;

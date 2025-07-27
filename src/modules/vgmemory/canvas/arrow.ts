import type { Node } from "@interfaces/Node";
class Arrow {
  private initPos: Node;
  private endPos: Node;
  private width: number = 3;
  private color: string;
  constructor(endPos: Node, starPos: Node, color: string = "#fff") {
    this.endPos = endPos;
    this.initPos = starPos;
    this.color = color;
  }

  //dead bruh
  public calculateDistance(): number {
    const difX = Math.pow(this.initPos.x - this.endPos.x, 2);
    const difY = Math.pow(this.endPos.y - this.initPos.y, 2);
    return Math.sqrt(difX + difY);
  }

  public drawBody(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.initPos.x, this.initPos.y);
    ctx.lineTo(this.endPos.x, this.endPos.y);
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }

  public drawTop(ctx: CanvasRenderingContext2D): void {
    //solo considero angulo < 90 wasaaa
    //Revisando mi AMGA
    const hypotenuse = 100; //en fin la hipotenusa
    const angle = Math.PI/3;
    const {x,y} = this.endPos;
    const opLeg = hypotenuse*Math.sin(angle);
    const adLeg = hypotenuse*Math.cos(angle);
    ctx.beginPath();
    ctx.moveTo(x,y);
    console.log("x-opLeg",x-opLeg);
    console.log("x-adLeg",x-adLeg);
    console.log("y-adLeg",x-adLeg);
    console.log("y-opLeg",x-opLeg);

    ctx.lineTo(x-opLeg,y+adLeg)
    ctx.lineTo(x,y);
    ctx.lineTo(x-adLeg, y-opLeg);
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
    this.drawTop(ctx);
  }
}
export default Arrow;

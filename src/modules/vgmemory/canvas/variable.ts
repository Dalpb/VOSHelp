import {
  centerTxtHorizontaly,
  centerTxtVerticaly,
  getHeightText,
  getWidthText,
} from "@utils/canvasutils";
import Memory from "./memory";

//this entity represent a variable, pointer
class Variable extends Memory {
  protected name: string = "";
  protected gaplines: number = this.height / 3.8; //recta que separa el nombre de la variable
  constructor(
    xpos: number,
    ypos: number,
    height: number,
    width: number,
    innerTxt: string,
    name: string
  ) {
    super(xpos, ypos, height, width, innerTxt);
    this.name = name;
    //creería que se podría hacer de otra forma
  }

  drawHeader(ctx: CanvasRenderingContext2D): void  {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.xPos, this.yPos + this.gaplines, this.width, 3);
    const width = getWidthText(ctx, this.name);
    const height = getHeightText(ctx, this.name);
    const x = centerTxtHorizontaly(this.xPos, this.xPos + this.width, width);
    const y = centerTxtVerticaly(this.yPos, this.yPos + this.gaplines, height);

    ctx.fillText(this.name, x, y);
  }

  public drawContent(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#fff";
    const width = getWidthText(ctx, this.innerTxt);
    const height = getHeightText(ctx, this.innerTxt);
    const x = centerTxtHorizontaly(this.xPos, this.xPos + this.width, width);
    const y = centerTxtVerticaly(
      this.yPos + this.gaplines,
      this.yPos + this.height,
      height
    );
    ctx.fillText(this.innerTxt, x, y);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
    ctx.beginPath();
    this.drawHeader(ctx);
    ctx.closePath();
  }
}

export default Variable;

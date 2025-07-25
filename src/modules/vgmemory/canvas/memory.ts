import {
  centerTxtHorizontaly,
  centerTxtVerticaly,
  getHeightText,
  getWidthText,
} from "@utils/canvasutils";

class Memory {
  protected xPos: number = 0;
  protected yPos: number = 0;
  protected height: number = 0;
  protected width: number = 0;
  protected innerTxt: string = "";
  constructor(
    xpos: number,
    ypos: number,
    height: number,
    width: number,
    innerTxt?: string
  ) {
    this.xPos = xpos;
    this.yPos = ypos;
    this.width = width;
    this.innerTxt = innerTxt ?? "";
    this.height = height;
  }
  


  public drawBody(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#333";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    ctx.strokeRect(this.xPos, this.yPos, this.width, this.height);
  }

  public drawContent(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#fff";
    const width = getWidthText(ctx, this.innerTxt);
    const height = getHeightText(ctx, this.innerTxt);
    const x = centerTxtHorizontaly(this.xPos, this.xPos + this.width, width);
    const y = centerTxtVerticaly(this.yPos, this.yPos + this.height, height);
    ctx.fillText(this.innerTxt, x, y);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.font = `17px Fira Code`;
    this.drawBody(ctx);
    this.drawContent(ctx);
    ctx.closePath();
  }
}

export default Memory;

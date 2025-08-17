import {
  centerTxtHorizontaly,
  centerTxtVerticaly,
  getHeightText,
  getWidthText,
} from "@utils/canvasutils";
import Variable from "./variable";
//representa a la structura de header que mandan en SO LAB6
class Header extends Variable {
  private lineBasePtr: number; //linea base de ptr
  private topLineX: number; //linea top del campo x
  private size = 0; //valor de size
  constructor(
    direction:number,
    xpos: number,
    ypos: number,
    height: number,
    width: number,
    innerTxt: string,
    name: string,
    size:number
  ) {
    super(direction,xpos, ypos, height, width, innerTxt, name);
    this.lineBasePtr = this.yPos + this.gaplines + this.height / 5; // pos line eje y
    this.topLineX = this.yPos + this.height - this.height / 5; //pos line eje y
    this.size =size;
  }


  protected drawSpaceS(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#fff";
    const letter = "ptr";
    ctx.fillRect(this.xPos, this.lineBasePtr, this.width, 3);
    const width = getWidthText(ctx, letter);
    const height = getHeightText(ctx, letter);
    const x = centerTxtHorizontaly(this.xPos, this.xPos + this.width, width);
    const y = centerTxtVerticaly(
      this.yPos + this.gaplines,
      this.lineBasePtr,
      height
    );
    ctx.fillText(letter, x, y);
  }
  //mejorar estructuración de función
  protected drawBodyS(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#fff";
    const size = `size:${this.size}`;
    let width = getWidthText(ctx, size);
    let height = getHeightText(ctx, size);
    let x = centerTxtHorizontaly(this.xPos, this.xPos + this.width, width);
    let y = centerTxtVerticaly(this.lineBasePtr, this.topLineX, height);
    ctx.fillText(size, x, y);
  }
  protected drawSpaceX(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#fff";
    const letter = "x ";
    ctx.fillRect(this.xPos, this.topLineX, this.width, 3);
    const width = getWidthText(ctx, letter);
    const height = getHeightText(ctx, letter);
    const x = centerTxtHorizontaly(this.xPos, this.xPos + this.width, width);
    const y = centerTxtVerticaly(
      this.topLineX,
      this.yPos + this.height,
      height
    );
    ctx.fillText(letter, x, y);
  }

  protected drawContent(ctx: CanvasRenderingContext2D): void {
    this.drawSpaceS(ctx);
    this.drawBodyS(ctx);
    this.drawSpaceX(ctx);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
  }
}

export default Header;

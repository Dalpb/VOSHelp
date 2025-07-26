import {
  centerTxtHorizontaly,
  centerTxtVerticaly,
  getHeightText,
  getWidthText,
} from "@utils/canvasutils";
import Variable from "./variable";
//representa a la structura de header que mandan en SO LAB6
class Header extends Variable {
  private baseLineS: number; //linea base del campo s
  private topLineX: number; //linea top del campo x
  private size = 0; //valor de size
  private gapLineS: number; //linea que separa el campo *ptr y size

  constructor(
    xpos: number,
    ypos: number,
    height: number,
    width: number,
    innerTxt: string,
    name: string
  ) {
    super(xpos, ypos, height, width, innerTxt, name);
    this.baseLineS = this.yPos + this.gaplines + this.height / 6; // pos line eje y
    this.topLineX = this.yPos + this.height - this.height / 6; //pos line eje y
    this.gapLineS = (2 * this.xPos + this.width) / 2; //pos eje x
  }
  public drawSpaceS(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#fff";
    const letter = "s";
    ctx.fillRect(this.xPos, this.baseLineS, this.width, 3);
    const width = getWidthText(ctx, letter);
    const height = getHeightText(ctx, letter);
    const x = centerTxtHorizontaly(this.xPos, this.xPos + this.width, width);
    const y = centerTxtVerticaly(
      this.yPos + this.gaplines,
      this.baseLineS,
      height
    );
    ctx.fillText(letter, x, y);
  }
  //mejorar estructuración de función
  public drawBodyS(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle ="#fff";
    const size = `size=${this.size}`
    const ptr = "*ptr"
    ctx.fillRect(this.gapLineS,this.baseLineS,3,this.topLineX-this.baseLineS);
  }
  public drawSpaceX(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#fff";
    const letter = "x";
    ctx.fillRect(this.xPos,this.topLineX,this.width,3);
    const width = getWidthText(ctx, letter);
    const height = getHeightText(ctx, letter);
    const x = centerTxtHorizontaly(this.xPos, this.xPos + this.width, width);
    const y = centerTxtVerticaly(
      this.topLineX,
      this.yPos+this.height,
      height
    );
    ctx.fillText(letter, x, y);    
  }

  public drawContent(ctx: CanvasRenderingContext2D): void {
    this.drawSpaceS(ctx);
    this.drawBodyS(ctx);
    this.drawSpaceX(ctx);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
  }
}

export default Header;

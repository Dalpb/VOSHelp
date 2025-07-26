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
    ctx.fillText(
      this.innerTxt,
      this.xPos + this.width / 3,
      this.yPos + this.height / 2
    );
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.font = `20px Fira Code`;
    this.drawBody(ctx);
    this.drawContent(ctx);
    ctx.closePath();
  }
}

export default Memory;

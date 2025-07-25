import Memory from "./memory";

//this entity represent a variable, pointer
class Variable extends Memory {
  protected name: string = "";
  private gaplines: number = this.height/3.5;
  constructor(xpos: number,ypos:number,height : number,width : number,innerTxt : string,name:string){
    super(xpos,ypos,height,width,innerTxt);
    this.name = name;
  }

  drawHeader(ctx:CanvasRenderingContext2D){
    ctx.fillStyle = "#fff";
    //const nameWidth = ctx.measureText(this.name).width;
    ctx.fillRect(this.xPos,this.yPos+ this.gaplines,this.width,3);
    ctx.fillText(this.name,this.xPos+this.width/3,this.yPos+this.gaplines - 10 )
  }

  public drawContent(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#fff";
    //falta considerar el gapline, overline
    ctx.fillText(this.innerTxt,this.xPos+this.width/3,this.yPos+this.height - 30)
  }

  draw(ctx: CanvasRenderingContext2D): void {
      super.draw(ctx);
      ctx.beginPath();
      this.drawHeader(ctx);
      ctx.closePath();
  }
}

export default Variable;

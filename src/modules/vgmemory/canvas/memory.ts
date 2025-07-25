class Memory {
  protected xPos: number = 0;
  protected yPos: number = 0;
  protected height: number = 0;
  protected width: number = 0;
  protected innerTxt : string = "";
  
  constructor(xpos: number,ypos:number,height : number,width : number,innerTxt : string){
    this.xPos = xpos;
    this.yPos = ypos;
    this.width = width;
    this.innerTxt = innerTxt;
    this.height = height
  }
  draw(ctx : CanvasRenderingContext2D){
    ctx.beginPath();
    ctx.font="20px Fira Code"
    ctx.fillStyle = "#333";
    ctx.fillRect(this.xPos,this.yPos,this.width,this.height);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3
    ctx.strokeRect(this.xPos,this.yPos,this.width,this.height);
    if(this instanceof Memory){
      ctx.fillStyle = "#fff";
      ctx.fillText(this.innerTxt,this.width/3,this.height/2);
      ctx.closePath();
    }
  }
}

export default Memory;

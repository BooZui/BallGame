export default class Backgroud {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.color = "rgba(0, 0, 0, 0.1)";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.game.width, this.game.height);
  }
}
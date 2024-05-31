export default class Projectile {
  constructor(game, velocity) {
    this.game = game;
    this.x = this.game.player.x;
    this.y = this.game.player.y;
    this.radius = 6;
    this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    this.velocity = velocity;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

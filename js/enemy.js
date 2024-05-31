export default class Enemy {
  constructor(game, x, y, radius, speed) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    this.speed = speed;
    this.velocity = null
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(ctx) {
    this.velocity = {
      x: Math.cos(
        Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x)
      ),
      y: Math.sin(
        Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x)
      ),
    };
    this.x += this.speed * this.velocity.x;
    this.y += this.speed * this.velocity.y;
    this.draw(ctx);
  }
}
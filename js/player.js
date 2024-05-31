export default class Player {
  constructor(game) {
    this.game = game;
    this.x = this.game.width / 2;
    this.y = this.game.height / 2;
    this.radius = 10;
    this.color = "rgb(255, 255, 255)";
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(input) {
    if (input.includes('d') &&
    !input.includes('a') &&
    !input.includes('w') &&
    !input.includes('s'))
      this.x += 3
    else if (input.includes('a') &&
    !input.includes('d') &&
    !input.includes('w') &&
    !input.includes('s'))
      this.x -= 3
    else if (input.includes('w') &&
    !input.includes('s') &&
    !input.includes('a') &&
    !input.includes('d'))
      this.y -= 3
    else if (input.includes('s') &&
    !input.includes('w') &&
    !input.includes('a') &&
    !input.includes('d'))
      this.y += 3
    else if (input.includes('a') &&
    input.includes('w') &&
    !input.includes('d') &&
    !input.includes('s')) {
      this.x -= 3 * Math.cos(Math.PI / 4)
      this.y -= 3 * Math.sin(Math.PI / 4)
    }
    else if (input.includes('a') &&
    input.includes('s') &&
    !input.includes('w') &&
    !input.includes('d')) {
      this.x -= 3 * Math.cos(Math.PI / 4)
      this.y += 3 * Math.sin(Math.PI / 4)
    }
    else if (input.includes('d') &&
    input.includes('w') &&
    !input.includes('a') &&
    !input.includes('s')) {
      this.x += 3 * Math.cos(Math.PI / 4)
      this.y -= 3 * Math.sin(Math.PI / 4)
    }
    else if (input.includes('d') &&
    input.includes('s') &&
    !input.includes('w') &&
    !input.includes('a')) {
      this.x += 3 * Math.cos(Math.PI / 4)
      this.y += 3 * Math.sin(Math.PI / 4)
    }
  }
}
export default class Particle {
  constructor(game, x, y, color) {
    this.game = game
    this.x = x
    this.y = y
    this.radius = Math.random() * 2 + 1
    this.color = color
    this.setVelocity = 0.98
    this.velocity = {
      x: (Math.random() - 0.5) * (Math.random() * 8),
      y: (Math.random() - 0.5) * (Math.random() * 8),
    }
    this.alpha = 1
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.alpha
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }

  update(ctx) {
    this.draw(ctx)
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.velocity.x *= this.setVelocity
    this.velocity.y *= this.setVelocity
    this.alpha -= 0.01
  }
}
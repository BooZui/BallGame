import Player from "./player.js";
import Backgroud from "./backgroud.js";
import Enemy from "./enemy.js";
import Projectile from "./projectile.js";
import Particle from "./particle.js";
import HandleEvent from "./handleEvent.js";

window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const scores = document.getElementById("scores");
  const speed = document.getElementById("speed");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  class Game {
    constructor(width, height, ctx) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.backgroud = new Backgroud(this);
      this.player = new Player(this);
      this.input = new HandleEvent();
      this.enemies = [];
      this.projectiles = [];
      this.particlies = [];
      this.spawnEnemy = 0;
      this.spawnInterval = 1000;
      this.speed = 1;
      this.speedEnemies = 0;
      this.speedEnemiesInterval = 1000 * 60;
      this.scores = 0;
      this.speedIf = 0;
      this.play = false;
    }

    draw(deltaTime) {
      this.backgroud.draw(this.ctx);
      this.player.draw(this.ctx);
      if (this.speedEnemies > this.speedEnemiesInterval) {
        this.speed += 1;
        this.speedEnemies = 0;
      } else this.speedEnemies += deltaTime;
      speed.innerHTML = this.speed;
      if (this.spawnEnemy > this.spawnInterval) {
        const radius = Math.random() * 24 + 6;
        let x;
        let y;

        if (Math.random() < 0.5) {
          x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
          y = Math.random() * canvas.height;
        } else {
          x = Math.random() * canvas.width;
          y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        this.enemies.push(new Enemy(this, x, y, radius, this.speed));
        this.spawnEnemy = 0;
      } else this.spawnEnemy += deltaTime;
    }

    update() {
      this.player.update(this.input.keys);
      this.enemies.forEach((enemy, enemyIndex) => {
        enemy.update(this.ctx);
        const distance = Math.hypot(
          this.player.x - enemy.x,
          this.player.y - enemy.y
        );

        if (distance - enemy.radius - this.player.radius < 1) {
          this.play = true;
        }

        this.projectiles.forEach((projectile, projectileIndex) => {
          const distance = Math.hypot(
            projectile.x - enemy.x,
            projectile.y - enemy.y
          );
          if (distance - enemy.radius - projectile.radius < 1) {
            for (let i = 0; i <= enemy.radius * 2; i++) {
              this.particlies.push(
                new Particle(this, projectile.x, projectile.y, enemy.color)
              );
            }

            if (enemy.radius - 6 > 10) {
              this.scores += 10;
              scores.innerHTML = this.scores;
              gsap.to(enemy, {
                radius: (enemy.radius -= 6),
              });
              setTimeout(() => {
                this.projectiles.splice(projectileIndex, 1);
              }, 0);
            } else {
              this.scores += 15;
              scores.innerHTML = this.scores;
              setTimeout(() => {
                this.enemies.splice(enemyIndex, 1);
                this.projectiles.splice(projectileIndex, 1);
              }, 0);
            }
          }
        });
      });
      this.projectiles.forEach((projectile, index) => {
        projectile.update(this.ctx);

        if (
          projectile.x + projectile.radius < 0 ||
          projectile.x - canvas.width > 0 ||
          projectile.y + projectile.radius < 0 ||
          projectile.y - canvas.height > 0
        ) {
          this.projectiles.splice(index, 1);
        }
      });

      this.particlies.forEach((particle, index) => {
        particle.update(this.ctx);
        if (particle.alpha <= 0.01) {
          this.particlies.splice(index, 1);
        }
      });
    }
  }

  const game = new Game(canvas.width, canvas.height, ctx);

  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.draw(deltaTime);
    game.update();
    const animation = requestAnimationFrame(animate);
    if (game.play) {
      setTimeout(() => {
        cancelAnimationFrame(animation);
      }, 0);
    }
  }

  animate(0);

  addEventListener("click", (event) => {
    const angle = Math.atan2(
      event.layerY - game.player.y,
      event.layerX - game.player.x
    );
    const velocity = {
      x: 8 * Math.cos(angle),
      y: 8 * Math.sin(angle),
    };
    game.projectiles.push(new Projectile(game, velocity));
  });
});

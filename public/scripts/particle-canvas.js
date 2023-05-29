const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const NUM_PARTICLES_MAX = 100;

// maybe need to take into account "window.devicePixelRatio"
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.position = "fixed";
canvas.style.zIndex = "-1";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomPosition(x, y, width, height) {
  const randX = getRandomInt(x, x + width);
  const randY = getRandomInt(y, y + height);
  return {
    x: randX,
    y: randY,
  };
}

function createParticle() {
  const { x, y } = getRandomPosition(0, 0, canvas.width, canvas.height);
  const radius = getRandomInt(0, 3);
  const particle = {
    update(timestamp) {},
    draw(timestamp) {
      context.save();
      context.beginPath()
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fillStyle = "blue";
      context.fill();
      context.restore();
    },
  };
  return particle;
}

function animate(timestamp) {
  const numParticles = getRandomInt(0, NUM_PARTICLES_MAX)
  const particles = Array(numParticles)
    .fill()
    .map((_) => createParticle());

  window.requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.update(timestamp);
    p.draw(timestamp);
  });
}

function init() {
  document.body.appendChild(canvas);
  animate();
}

init();

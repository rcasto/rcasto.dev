const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const NUM_PARTICLES_MAX = 100;
const MOUSE_REPULSION_RADIUS = 150;
const MOUSE_REPULSION_STRENGTH = 0.001;

// Paired light/dark colors per hue family — same character, different intensity
const PALETTE = [
  { light: "#C96A52", dark: "#FF7B6E" }, // coral
  { light: "#C49830", dark: "#FFCF47" }, // gold
  { light: "#5A9478", dark: "#5FE3A0" }, // mint
  { light: "#8A70A8", dark: "#B57BFF" }, // violet
  { light: "#4E8BA0", dark: "#4AC8EC" }, // cyan
  { light: "#B87080", dark: "#FF8FA3" }, // pink
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomPosition(x, y, width, height) {
  return {
    x: getRandomInt(x, x + width),
    y: getRandomInt(y, y + height),
  };
}

function getRandomVelocity() {
  const directionX = Math.random() < 0.5 ? -1 : 1;
  const directionY = Math.random() < 0.5 ? -1 : 1;
  return {
    x: Math.random() * 0.05 * directionX,
    y: Math.random() * 0.05 * directionY,
  };
}

function Particle() {
  this.id = crypto.randomUUID();
  this.radius = getRandomInt(1, 10);
  this.bound = {
    ...getRandomPosition(0, 0, window.innerWidth, window.innerHeight),
    r: this.radius,
  };
  this.velocity = getRandomVelocity();
  this.mass = this.radius * this.radius * Math.PI;
  this.colorIndex = getRandomInt(0, PALETTE.length - 1);
}

Particle.prototype.update = function (context, deltaTime) {
  this.bound.x += this.velocity.x * deltaTime;
  this.bound.y += this.velocity.y * deltaTime;

  if (this.bound.x - this.radius < 0) {
    this.bound.x = this.radius;
    this.velocity.x *= -0.95;
  }
  if (this.bound.x + this.radius > context.canvas.width) {
    this.bound.x = context.canvas.width - this.radius;
    this.velocity.x *= -0.95;
  }
  if (this.bound.y - this.radius < 0) {
    this.bound.y = this.radius;
    this.velocity.y *= -0.95;
  }
  if (this.bound.y + this.radius > context.canvas.height) {
    this.bound.y = context.canvas.height - this.radius;
    this.velocity.y *= -0.95;
  }
};

Particle.prototype.draw = function (context) {
  const isDark = document.documentElement.dataset.theme === "dark";
  const { light, dark } = PALETTE[this.colorIndex];
  const color = isDark ? dark : light;

  context.save();
  context.beginPath();
  context.arc(this.bound.x, this.bound.y, this.radius, 0, 2 * Math.PI);
  context.fillStyle = color;

  if (isDark) {
    context.shadowBlur = this.radius * 4;
    context.shadowColor = color;
    context.globalAlpha = 0.85;
  } else {
    context.globalAlpha = 0.55;
  }

  context.fill();
  context.restore();
};

function createParticles(numParticles) {
  return Array(numParticles)
    .fill()
    .map(() => new Particle());
}

let obstacles = [];

function buildObstacles() {
  obstacles = [];

  // Profile image is visually circular — represent as a circle
  const profileImg = document.querySelector(".profile-image");
  if (profileImg) {
    const rect = profileImg.getBoundingClientRect();
    obstacles.push({
      isStatic: true,
      bound: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        r: rect.width / 2,
      },
    });
  }

  // Links bar is a rectangle
  const linksBar = document.querySelector("main ul");
  if (linksBar) {
    const rect = linksBar.getBoundingClientRect();
    obstacles.push({
      isStatic: true,
      bound: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      },
    });
  }

  // theme toggle button is circular — represent as a circle
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    const rect = themeToggle.getBoundingClientRect();
    obstacles.push({
      isStatic: true,
      bound: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        r: rect.width / 2,
      },
    });
  }
}

let numParticles;
let particles;
let lastAnimateTimestamp;
let mouse = null;

function animate(timestamp) {
  window.requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  const quadTree = window.SimpleQuad.createQuadTree(
    { x: 0, y: 0, width: canvas.width, height: canvas.height },
    { extractor: (p) => p.bound },
  );

  const deltaTimestamp = lastAnimateTimestamp
    ? timestamp - lastAnimateTimestamp
    : 0;
  lastAnimateTimestamp = timestamp;

  if (!particles) {
    numParticles = getRandomInt(10, NUM_PARTICLES_MAX);
    particles = createParticles(numParticles);
  }

  obstacles.forEach((o) => quadTree.add(o));
  particles.forEach((p) => quadTree.add(p));

  const resolvedPairs = new Set();
  particles.forEach((p) => {
    const collisions = quadTree.query(p.bound);
    for (const { object: q, mtv } of collisions) {
      if (q.isStatic) {
        // Static obstacle: push particle out fully and reflect its velocity
        p.bound.x += mtv.vector.x;
        p.bound.y += mtv.vector.y;
        const dot =
          p.velocity.x * mtv.direction.x + p.velocity.y * mtv.direction.y;
        if (dot < 0) {
          const e = 0.7;
          p.velocity.x -= (1 + e) * dot * mtv.direction.x;
          p.velocity.y -= (1 + e) * dot * mtv.direction.y;
        }
        continue;
      }

      const pairKey = [p.id, q.id].sort().join("-");
      if (resolvedPairs.has(pairKey)) continue;
      resolvedPairs.add(pairKey);

      const totalMass = p.mass + q.mass;
      p.bound.x += mtv.vector.x * (q.mass / totalMass);
      p.bound.y += mtv.vector.y * (q.mass / totalMass);
      q.bound.x -= mtv.vector.x * (p.mass / totalMass);
      q.bound.y -= mtv.vector.y * (p.mass / totalMass);

      const nx = mtv.vector.x / mtv.magnitude;
      const ny = mtv.vector.y / mtv.magnitude;
      const dvx = p.velocity.x - q.velocity.x;
      const dvy = p.velocity.y - q.velocity.y;
      const relativeVelocity = dvx * nx + dvy * ny;

      if (relativeVelocity > 0) continue;

      const e = 0.8;
      const j = (-(1 + e) * relativeVelocity) / (1 / p.mass + 1 / q.mass);
      p.velocity.x += (j / p.mass) * nx;
      p.velocity.y += (j / p.mass) * ny;
      q.velocity.x -= (j / q.mass) * nx;
      q.velocity.y -= (j / q.mass) * ny;
    }
  });

  if (mouse) {
    const radiusSq = MOUSE_REPULSION_RADIUS * MOUSE_REPULSION_RADIUS;
    particles.forEach((p) => {
      const dx = p.bound.x - mouse.x;
      const dy = p.bound.y - mouse.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < radiusSq && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force =
          MOUSE_REPULSION_STRENGTH * (1 - dist / MOUSE_REPULSION_RADIUS);
        p.velocity.x += (dx / dist) * force * deltaTimestamp;
        p.velocity.y += (dy / dist) * force * deltaTimestamp;
      }
    });
  }

  particles.forEach((p) => {
    p.update(context, deltaTimestamp);
    p.draw(context);
  });

  // Debug grid: only in dark mode — becomes part of the "lights off" aesthetic
  if (document.documentElement.dataset.theme === "dark") {
    window.SimpleQuad.drawDebug(quadTree, context, {
      strokeStyle: "rgba(74, 200, 236, 0.12)",
      lineWidth: 0.5,
    });
  } else {
    // try it in light mode too
    window.SimpleQuad.drawDebug(quadTree, context, {
      strokeStyle: "rgba(158, 90, 21, 0.12)",
      lineWidth: 0.5,
    });
  }
}

function init() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.zIndex = "-1";
  document.body.appendChild(canvas);

  buildObstacles();

  window.addEventListener("resize", function resize() {
    window.clearTimeout(resize.timeoutId);
    resize.timeoutId = window.setTimeout(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildObstacles();
    }, 150);
  });

  window.addEventListener("mousemove", (e) => {
    mouse = { x: e.clientX, y: e.clientY };
  });
  window.addEventListener("mouseleave", () => {
    mouse = null;
  });

  animate();
}

init();

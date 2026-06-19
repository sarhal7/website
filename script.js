const typedNode = document.getElementById("typed");
const celebrateBtn = document.getElementById("celebrateBtn");
const revealEls = document.querySelectorAll(".reveal");

const lines = [
  "npm run birthday -- --to='My Favorite Dev'",
  "Building cake bundle... done ✔",
  "Deploying joy to production... success 🚀",
  "No hotfixes needed. Have an epic year!"
];
const CONFETTI_COLORS = ["#6de3ff", "#9f7aea", "#ffd166", "#ff6b6b"];
const BASE_TYPING_SPEED = 45;
const TYPING_VARIANCE = 35;
const DEFAULT_CONFETTI_COUNT = 120;
const BUTTON_CONFETTI_COUNT = 220;

let lineIndex = 0;
let charIndex = 0;
let pause = false;

function typeLoop() {
  if (!typedNode) return;

  const current = lines[lineIndex];
  if (!pause) {
    typedNode.textContent = current.slice(0, charIndex++);
  }

  if (charIndex > current.length) {
    pause = true;
    setTimeout(() => {
      pause = false;
      charIndex = 0;
      lineIndex = (lineIndex + 1) % lines.length;
      typedNode.textContent = "";
    }, 1200);
    setTimeout(typeLoop, 1200);
    return;
  }

  setTimeout(typeLoop, BASE_TYPING_SPEED + Math.random() * TYPING_VARIANCE);
}

typeLoop();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealEls.forEach((el) => observer.observe(el));

const canvas = document.getElementById("confetti");
const ctx = canvas?.getContext("2d");
let particles = [];

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function spawnConfetti(count = DEFAULT_CONFETTI_COUNT) {
  if (!canvas) return;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.2,
      size: 4 + Math.random() * 6,
      speedY: 1.4 + Math.random() * 3,
      speedX: -1 + Math.random() * 2,
      tilt: Math.random() * Math.PI,
      spin: -0.08 + Math.random() * 0.16,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
    });
  }
}

function animateConfetti() {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.tilt += p.spin;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.tilt);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();
  });

  particles = particles.filter((p) => p.y < canvas.height + 30);
  requestAnimationFrame(animateConfetti);
}

if (canvas) {
  resizeCanvas();
  animateConfetti();
  window.addEventListener("resize", resizeCanvas);
}

celebrateBtn?.addEventListener("click", () => {
  spawnConfetti(BUTTON_CONFETTI_COUNT);
  celebrateBtn.textContent = "Party deployed 🎊";
  window.setTimeout(() => {
    celebrateBtn.textContent = "Run Celebration()";
  }, 1700);
});

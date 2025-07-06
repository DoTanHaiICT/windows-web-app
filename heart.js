let canvas, ctx, width, height, petals = [], animationId = null;

function createHeartPetals(num = 60) {
    petals = [];
    for (let i = 0; i < num; i++) {
        petals.push(new Petal());
    }
}

class Petal {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.size = 12 + Math.random() * 10;
        this.speedY = 1.5 + Math.random() * 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * 0.02 - 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.rotation;
        if (this.y > height + 20) {
            this.y = -10;
            this.x = Math.random() * width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.scale(this.size / 20, this.size / 20);
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.bezierCurveTo(5, -15, 15, -5, 0, 10);
        ctx.bezierCurveTo(-15, -5, -5, -15, 0, -5);
        ctx.fillStyle = 'rgba(255, 105, 180, 0.9)';
        ctx.fill();
        ctx.restore();
    }
}

function startSakura() {
    canvas = document.getElementById('sakura-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    createHeartPetals(50);
    animate();
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const petal of petals) {
        petal.update();
        petal.draw();
    }
    animationId = requestAnimationFrame(animate);
}

function stopSakura() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    if (ctx) ctx.clearRect(0, 0, width, height);
}

window.addEventListener("DOMContentLoaded", () => {
    // Không khởi động mặc định
    const toggleBtn = document.getElementById("toggleEffect");
    let active = false;

    toggleBtn.addEventListener("click", () => {
        active = !active;
        if (active) {
            startSakura();
            toggleBtn.textContent = "❌ Tắt hiệu ứng";
        } else {
            stopSakura();
            toggleBtn.textContent = "💖 Bật hiệu ứng";
        }
    });

    window.addEventListener('resize', () => {
        if (canvas) {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
    });
});

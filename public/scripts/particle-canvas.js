const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const particles = [];

// maybe need to take into account "window.devicePixelRatio"
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createParticle() {
    return {
        
    };
}

function animate(timestamp) {
    window.requestAnimationFrame(animate);

    context.save();
    context.fillStyle = 'red';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

function init() {
    document.body.appendChild(canvas);
    animate();
}

init();
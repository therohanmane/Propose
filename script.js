// --- CONFIGURATION ---
const flirtMessages = {
    "ananya": [
        "Identity Verified: The Queen of My Heart 👑<br>I didn't need a password, I just needed you.",
        "Access Granted: Ananya ✨<br>Warning: My love for you is overflowing!"
    ],
    "priya": [
        "Welcome Back, Priya ❤️<br>System Analysis: You are 100% beautiful.",
        "Identity Confirmed.<br>Status: The love of my life."
    ],
    "ruby": [
        "Ruby identified! 💎<br>You truly are a gem in my life. I love you!",
        "Access Granted: Ruby ✨<br>My heart beats only for you."
    ],
    "default": [
        "Identity Verified: My Favorite Person ❤️<br>I made this just to see you smile.",
        "Access Granted ✨<br>You are the reason my heart skips a beat.",
        "Welcome, Love! 💖<br>I didn't lock this message... I was just waiting for you."
    ]
};

// --- STATE ---
let currentStepId = 'step-intro';
let userName = '';

// --- NAVIGATION ---
function nextStep(currentId, nextId) {
    const current = document.getElementById(currentId);
    const next = document.getElementById(nextId);

    // Fade Out
    current.style.opacity = '0';
    current.style.transform = 'translateY(-10px)';

    setTimeout(() => {
        current.classList.remove('active');
        current.classList.add('hidden');

        // Prepare Next
        next.classList.remove('hidden');
        next.classList.add('active');
        next.style.opacity = '0';
        next.style.transform = 'translateY(10px)';

        // Trigger Reflow
        void next.offsetWidth;

        // Fade In
        next.style.opacity = '1';
        next.style.transform = 'translateY(0)';

        // Special Case: Reveal
        if (nextId === 'step-reveal') {
            triggerReveal();
        }
    }, 500);
}

function validateName() {
    const input = document.getElementById('user-name');
    const name = input.value.trim();

    if (name.length > 0) {
        userName = name;
        nextStep('step-name', 'step-check');
    } else {
        // Shake animation for error
        input.style.border = "1px solid red";
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
            input.style.border = "1px solid rgba(255,255,255,0.2)";
        }, 500);
    }
}

// --- REVEAL LOGIC ---
function triggerReveal() {
    const title = document.getElementById('reveal-title');
    const messageContainer = document.getElementById('reveal-message');
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    // 1. Set personalized title
    title.innerHTML = `Welcome, ${userName} ✨`;

    // 2. Determine Message
    const lowerName = userName.toLowerCase();
    let options = flirtMessages[lowerName] || flirtMessages['default'];
    let finalMsg = options[Math.floor(Math.random() * options.length)];

    // Replace placeholders if any
    finalMsg = finalMsg.replace("[Name]", userName);

    // 3. Typewriter Effect
    typeWriter(finalMsg, messageContainer);

    // 4. Play Music & Confetti
    music.volume = 0.6;
    music.play().then(() => {
        musicBtn.classList.remove('hidden');
    }).catch(e => {
        console.log("Autoplay blocked");
        musicBtn.classList.remove('hidden');
    });

    createParticles();
}

function typeWriter(html, element) {
    // Simple HTML typewriter (reveals char by char, treating tags as single units is harder, 
    // so we'll just inject HTML for now to keep formatting valid, then fade it in)

    element.innerHTML = html;
    element.style.opacity = '0';

    let opacity = 0;
    const interval = setInterval(() => {
        opacity += 0.05;
        element.style.opacity = opacity;
        if (opacity >= 1) clearInterval(interval);
    }, 50);
}

// --- EFFECTS ---
function createParticles() {
    const container = document.getElementById('extra-hearts');
    const symbols = ['❤️', '✨', '💖', '🌸'];

    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        p.style.position = 'fixed';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = '100vh';
        p.style.fontSize = Math.random() * 20 + 20 + 'px';
        p.style.animation = `floatUp ${Math.random() * 3 + 2}s linear forwards`;
        container.appendChild(p);

        setTimeout(() => p.remove(), 5000);
    }
}

// Music Button Toggle
document.getElementById('music-btn').addEventListener('click', () => {
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
});

// CSS Shake Animation Helper
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}
.shake { animation: shake 0.3s; }
@keyframes floatUp {
    to { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
}
`;
document.head.appendChild(style);
// --- CHASING NO BUTTON ---
const noBtn = document.getElementById('no-btn');
const yesBtn = document.querySelector('.yes-btn');

noBtn.addEventListener('mouseover', (e) => {
    moveNoButton(e);
});
noBtn.addEventListener('click', (e) => {
    moveNoButton(e);
});

function moveNoButton(e) {
    // 1. Make the button absolute/fixed immediately
    noBtn.style.position = 'fixed';
    noBtn.style.zIndex = '1000';

    // 2. Get Dimensions
    const btnRect = noBtn.getBoundingClientRect();
    const width = btnRect.width;
    const height = btnRect.height;

    // 3. Calculate "Repulsion" Vector (Move away from mouse)
    // If e is missing (manual call), fake it or use center
    let mouseX = e ? e.clientX : window.innerWidth / 2;
    let mouseY = e ? e.clientY : window.innerHeight / 2;

    const btnCenterX = btnRect.left + width / 2;
    const btnCenterY = btnRect.top + height / 2;

    // Direction vector (Button - Mouse)
    let deltaX = btnCenterX - mouseX;
    let deltaY = btnCenterY - mouseY;

    // Normalize and Scale (Jump distance)
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1; // Avoid div by zero
    const jumpDistance = 300; // How far it jumps

    let moveX = (deltaX / distance) * jumpDistance;
    let moveY = (deltaY / distance) * jumpDistance;

    // Add some randomness so it's not perfectly predictable
    moveX += (Math.random() - 0.5) * 100;
    moveY += (Math.random() - 0.5) * 100;

    // Calculate new potential position
    let newX = btnRect.left + moveX;
    let newY = btnRect.top + moveY;

    // 4. Boundary Checks (Bounce off walls)
    const maxX = window.innerWidth - width - 20;
    const maxY = window.innerHeight - height - 20;

    if (newX < 20) newX = maxX - 100; // Teleport to other side if cornered
    if (newX > maxX) newX = 20 + 100;
    if (newY < 20) newY = maxY - 100;
    if (newY > maxY) newY = 20 + 100;

    // 5. Apply
    noBtn.style.transition = "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)"; // Smoother easing
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';

    // 6. Fun Text
    const texts = [
        "Too slow! 😈", "Not today!", "Try harder! 🏃‍♂️",
        "Cant touch this!", "Just click YES! ❤️", "Oops! 🤭",
        "Nope!", "Catch me if you can!", "I'm elusive! 👻"
    ];
    noBtn.textContent = texts[Math.floor(Math.random() * texts.length)];

    // 7. Grow the YES button
    let currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    if (currentSize < 100) {
        yesBtn.style.fontSize = (currentSize + 8) + 'px'; // Grow faster
        yesBtn.style.padding = (parseFloat(window.getComputedStyle(yesBtn).padding) + 4) + 'px';
    }
}

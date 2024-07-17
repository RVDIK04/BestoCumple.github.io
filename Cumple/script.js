let attemptCount = 0;
let currentQuestion = 0;
const maxAttempts = 4; // Número máximo de intentos permitidos
const hints = [
    "Primera pista: Es una sola palabra de 8 letras",
    "Segunda pista: Tiene que ver con la musica de fondo",
    "Tercera pista: Esta en idioma Alto Valyrio",
    "Cuarta pista: significa 'fuego de dragón'",
];

const questions = [
    { question: '¿Quien soy yo? tu...', answer: 'baby' },
    { question: '¿Que numero de camiseta uso cuando juego al futbol? La numero...', answer: '2' },
    { question: '¿Cual es el nombre de la mejor amiga en el mundo mundial?', answer: 'mackarena' },
    { question: 'Para verificar que no eres un inpostor y si mi besto ¿Que edad tiene mi besto?', answer: '20' },
    { question: 'Y por utlimo ¿Quien es mi tio?', answer: 'jordan23' },
];

document.addEventListener('DOMContentLoaded', (event) => {
    const music = document.getElementById('background-music');
    music.volume = 0.2;  // Establecer volumen al 20%
});

function chooseCard(cardNumber) {
    document.getElementById('choose-path').classList.add('hidden');
    if (cardNumber === 1) {
        document.getElementById('login-background').classList.remove('hidden');
    } else if (cardNumber === 2) {
        document.getElementById('questions-background').classList.remove('hidden');
        loadQuestion();
    }
}

function login() {
    const password = document.getElementById('password').value;
    if (password === 'tu_contraseña') {
        hideLoginElements();
        showBirthdayCard();
    } else {
        attemptCount++;
        if (attemptCount <= maxAttempts) {
            showHint(attemptCount); // Mostrar pista según el número de intentos
        } else {
            handleLoginFailure();
        }
    }
}

function showHint(attempt) {
    const hintIndex = attempt - 1; // Ajustar al índice correcto del array hints
    const hintMessage = hints[hintIndex];
    document.getElementById('hint-message').innerText = hintMessage;
    document.getElementById('hint-message').classList.remove('hidden');
}

function handleLoginFailure() {
    document.getElementById('login-card').classList.add('shake');
    setTimeout(() => {
        document.getElementById('login-card').classList.remove('shake');
    }, 500);
}

function loadQuestion() {
    document.getElementById('question-text').innerText = questions[currentQuestion].question;
}

function submitAnswer() {
    const answer = document.getElementById('answer').value.toLowerCase();
    if (answer === questions[currentQuestion].answer.toLowerCase()) {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
            document.getElementById('answer').value = '';
        } else {
            hideQuestionElements();
            showBirthdayCard();
        }
    } else {
        alert('Mmmmm Nop Piensalo Bien 🤔');
    }
}

function hideLoginElements() {
    document.getElementById('login-background').classList.add('hidden');
    document.getElementById('hint-message').classList.add('hidden');
}

function hideQuestionElements() {
    document.getElementById('questions-background').classList.add('hidden');
}

function showBirthdayCard() {
    document.getElementById('birthday-card').classList.remove('hidden');
    startConfetti();
}

function startConfetti() {
    const confettiSettings = { target: 'confetti-canvas', max: 100, size: 1.2, animate: true };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}

// Confetti.js - Biblioteca externa para manejar la animación de confeti
class ConfettiGenerator {
    constructor(params) {
        this.canvas = document.getElementById(params.target);
        this.ctx = this.canvas.getContext('2d');
        this.max = params.max;
        this.size = params.size;
        this.animate = params.animate;
        this.particles = [];
        this.setup();
    }

    setup() {
        for (let i = 0; i < this.max; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                r: (Math.random() * this.size) + 1,
                d: (Math.random() * this.max) + 1
            });
        }
        if (this.animate) {
            this.animateParticles();
        }
    }

    animateParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgba(106, 13, 173, 0.8)";
            this.ctx.moveTo(p.x, p.y);
            this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            this.ctx.fill();
            p.y += (Math.cos(p.d) + 1 + p.r / 2) / 2;
            p.x += Math.sin(p.d);
            if (p.x > this.canvas.width + 5 || p.x < -5 || p.y > this.canvas.height) {
                if (Math.random() > 0.5) {
                    p.x = Math.random() * this.canvas.width;
                    p.y = -10;
                } else {
                    p.x = this.canvas.width + 5;
                    p.y = Math.random() * this.canvas.height;
                }
            }
        });
        requestAnimationFrame(this.animateParticles.bind(this));
    }

    render() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.animateParticles();
    }
}

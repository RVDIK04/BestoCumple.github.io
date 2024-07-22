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
    { question: 'Y por ultimo ¿Quien es mi tio?', answer: 'jordan23' },
];

document.addEventListener('DOMContentLoaded', (event) => {
    const music = document.getElementById('background-music');
    music.volume = 0.05;  // mmusica 5%
});

const leftImages = [
    { src: 'images/1.jpg', description: 'Gracias acompañarme y aguantarme tantas horas ❤️' },
    { src: 'images/3.jpg', description: 'Gracias por dejarte carrear en el valo y a veces, solo a veces carrearme tu' },
    { src: 'images/5.jpg', description: 'Gracias por acompañarme a hacerme mi primer tatuaje 🥹' },
    { src: 'images/7.jpg', description: 'Asomada' },
    { src: 'images/9.jpg', description: 'Asomada X2' },
    { src: 'images/11.jpg', description: 'Cuando jugabamos phasmo y eras mas gritona que nadie y no querias entrar sola a la casa' },
    { src: 'images/13.jpg', description: 'Vendida X2' },
    { src: 'images/15.jpg', description: 'Muchas gracias por el regalo de navidad que me amarre las manos para no abrirlo antes' },
    { src: 'images/17.jpg', description: 'Volada y abrigadita' },
    { src: 'images/19.jpg', description: 'Cuando me acompañaste a la cancha y andaba resfriado y hacia cualquier frio y fuiste igual por mi. La mejor' },
    { src: 'images/21.jpg', description: 'Cagandote de la risa de mi' },
    // Agrega más imágenes y descripciones aquí
];

const rightImages = [
    { src: 'images/2.jpg', description: '2 Estrellas en la misma foto? 🌟' },
    { src: 'images/4.jpg', description: 'Recuerdo de las hijas de perra 🐕‍🦺' },
    { src: 'images/6.jpg', description: 'Tenia muchas vendidas tuyas asi que era necesario agregarlas tkm' },
    { src: 'images/8.jpg', description: 'Tus "No te enojes" son la mejor wea para no enojarse ❤️' },
    { src: 'images/10.jpg', description: 'The Most Important Very Very hablarle a tu besto, te extraña' },
    { src: 'images/12.jpg', description: 'Recien conociendonos aun que me teniai mala por que era (soy) pesado' },
    { src: 'images/14.jpg', description: 'Cuando viciabas cookie clicker y me dejaste una nota porque te dio sueño con la hora a la que despertarias' },
    { src: 'images/16.jpg', description: 'Cuando me hiciste un facetime no recuerdo para que y te saque una vendida' },
    { src: 'images/18.gif', description: 'Evidencia grafica del pancho haciendo algo con mas gente y fuera de la casa' },
    { src: 'images/20.jpg', description: 'Cuando hicimos el tarreo que yo no queria aceptar hasta esa vez 🥹' },
    { src: 'images/22.jpg', description: 'No te enojes X45' },
    // Agrega más imágenes y descripciones aquí
];

function startCarousel(selector, images) {
    let currentIndex = 0;
    const container = document.querySelector(selector);
    const imageElement = container.querySelector('.carousel-image');
    const descriptionElement = container.querySelector('.description');

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        imageElement.src = images[currentIndex].src;
        descriptionElement.textContent = images[currentIndex].description;
    }

    setInterval(showNextImage, 10000); // Cambiar cada 5 segundos
}

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
    if (password === 'dracarys') {
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

    const hintContainer = document.getElementById('hint-container');
    const hintElement = document.createElement('div');
    hintElement.className = 'hint';
    hintElement.innerText = hintMessage;
    hintContainer.appendChild(hintElement);
    hintContainer.classList.remove('hidden');
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
}

function hideQuestionElements() {
    document.getElementById('questions-background').classList.add('hidden');
}

function showBirthdayCard() {
    document.getElementById('birthday-card').classList.remove('hidden');
    document.querySelector('.side-image-left').style.display = 'block';
    document.querySelector('.side-image-right').style.display = 'block';
    startConfetti();
    startCarousel('.side-image-left', leftImages);
    startCarousel('.side-image-right', rightImages);
}

function startConfetti() {
    const confettiSettings = { target: 'confetti-canvas', max: 100, size: 1.2, animate: true };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}

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

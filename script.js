const errorMessage = document.getElementById('error-message');
const timerElement = document.getElementById('timer');
let timeLeft = 120; // tiempo en segundos
let timeoutHandle;
let errorTimeoutHandle;
const backgroundSound = document.getElementById('background-sound');
const backgroundMusic = document.getElementById('background-music');

// Establecer el volumen inicial del sonido
backgroundSound.volume = 0.2;
backgroundMusic.volume = 0.15;

function resetTimer() {
    clearTimeout(timeoutHandle);
    clearTimeout(errorTimeoutHandle);
    timeLeft = 120;
    timerElement.textContent = formatTime(timeLeft); // Actualiza el formato aquí también
    startTimer();
    errorMessage.textContent = 'intétalo de nuevo :)';
    errorTimeoutHandle = setTimeout(() => {
        errorMessage.textContent = '';
    }, 2000);
}

function countDown() {
    if (timeLeft <= 0) {
        clearTimeout(timeoutHandle);
        alert('¡Bien hecho! Completaste los 2 minutos de relajación.');
        window.location.reload(); // recarga la página para reiniciar
    } else {
        timerElement.textContent = formatTime(timeLeft);
        timeLeft--;
        timeoutHandle = setTimeout(countDown, 1000);
    }
}

function startTimer() {
    errorMessage.textContent = ''; // limpia mensajes de error anteriores
    timeoutHandle = setTimeout(countDown, 1000);
}

function toggleSound() {
    if (backgroundSound.paused) {
        backgroundSound.play();
        document.getElementById('sound-button').classList.add('active');
    } else {
        backgroundSound.pause();
        document.getElementById('sound-button').classList.remove('active');
    }
}
function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        backgroundMusic.currentTime = 95;
        document.getElementById('music-button').classList.add('active');
    } else {
        backgroundMusic.pause();
        document.getElementById('music-button').classList.remove('active');
    }
}
document.addEventListener('mousemove', resetTimer);
document.addEventListener('keypress', resetTimer);

startTimer(); // Inicia el temporizador

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

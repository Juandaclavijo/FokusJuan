// Obtener elementos del DOM
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');
const timerDisplay = document.querySelector('.time-display');

let workDuration = 25; // Duración de trabajo predeterminada en minutos
let breakDuration = 5; // Duración de descanso predeterminada en minutos
let isTimerRunning = false;
let timeLeft;
let interval;

// Función para actualizar el tiempo en el temporizador
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

// Función para iniciar el temporizador
function startTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    timeLeft = workDuration * 60; // Convertir minutos a segundos
    updateTimer();
    interval = setInterval(() => {
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(interval);
        if (workDuration === 60) {
          changeFocusLevel(breakDuration, workDuration); // Cambiar a tiempo de descanso
        } else {
          changeFocusLevel(workDuration, breakDuration); // Cambiar a tiempo de trabajo
        }
        isTimerRunning = false;
        startTimer();
      } else {
        updateTimer();
      }
    }, 1000);
  }
}

// Función para cambiar la duración de trabajo y descanso
function changeFocusLevel(work, breakTime) {
  workDuration = work;
  breakDuration = breakTime;
  if (!isTimerRunning) {
    timeLeft = workDuration * 60;
    updateTimer();
  }
}

// Eventos para los botones de cambio de enfoque
document.getElementById('light-focus').addEventListener('click', function() {
  changeFocusLevel(25, 5); // Cambiar a LightFocus (25 minutos de trabajo, 5 minutos de descanso)
});

document.getElementById('medium-focus').addEventListener('click', function() {
  changeFocusLevel(40, 10); // Cambiar a MediumFocus (40 minutos de trabajo, 10 minutos de descanso)
});

document.getElementById('deep-focus').addEventListener('click', function() {
  changeFocusLevel(60, 15); // Cambiar a DeepFocus (60 minutos de trabajo, 15 minutos de descanso)
});

// Evento para el botón de inicio
startButton.addEventListener('click', startTimer);

// Evento para el botón de pausa
pauseButton.addEventListener('click', function() {
  clearInterval(interval); // Detener el temporizador
  isTimerRunning = false;
});

// Evento para el botón de reinicio
resetButton.addEventListener('click', function() {
  clearInterval(interval); // Detener el temporizador
  isTimerRunning = false;
  workDuration = 25; // Restaurar duración de trabajo predeterminada
  breakDuration = 5; // Restaurar duración de descanso predeterminada
  timeLeft = workDuration * 60; // Reiniciar tiempo restante
  updateTimer(); // Actualizar el temporizador en la interfaz
});

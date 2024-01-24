document.addEventListener('DOMContentLoaded', function () {
  const focusTab = document.getElementById('focusTab');
  const shortBreakTab = document.getElementById('shortBreakTab');
  const longBreakTab = document.getElementById('longBreakTab');
  const timerDisplay = document.getElementById('timer');
  const startPauseBtn = document.getElementById('startPauseBtn');

  let timer;
  let minutes = 25;
  let seconds = 0;
  let isPaused = true;

  function startTimer() {
    timer = setInterval(updateTimer, 1000);
  }

  function pauseTimer() {
    clearInterval(timer);
  }

  function updateTimer() {
    if (minutes === 0 && seconds === 0) {
      clearInterval(timer);
      // Lógica para cambiar a la siguiente pestaña o realizar acciones al finalizar el temporizador
    } else {
      if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      updateDisplay();
    }
  }

  function updateDisplay() {
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  function switchTab(tabId, newMinutes) {
    if (!isPaused) {
      pauseTimer();
      isPaused = true;
    }

    focusTab.classList.remove('active');
    shortBreakTab.classList.remove('active');
    longBreakTab.classList.remove('active');

    document.getElementById(tabId).classList.add('active');

    minutes = newMinutes;
    seconds = 0;
    updateDisplay();
  }

  focusTab.addEventListener('click', function () {
    switchTab('focusTab', 25);
  });

  shortBreakTab.addEventListener('click', function () {
    switchTab('shortBreakTab', 5);
  });

  longBreakTab.addEventListener('click', function () {
    switchTab('longBreakTab', 15);
  });

  startPauseBtn.addEventListener('click', function () {
    if (isPaused) {
      startTimer();
      startPauseBtn.textContent = 'Pausar';
    } else {
      pauseTimer();
      startPauseBtn.textContent = 'Reanudar';
    }

    isPaused = !isPaused;
  });
});
// Utilidad para mantener uniforme la asignacion de texto en UI.
function setText(element, text) {
  element.textContent = text;
}

// Crea una interfaz de acceso a elementos del DOM y acciones de presentacion.
export function createUI() {
  // Referencias a nodos de UI utilizados durante toda la partida.
  const score = document.getElementById('score');
  const bestScore = document.getElementById('bestScore');
  const bestScoreStart = document.getElementById('bestScoreStart');
  const gameOver = document.getElementById('gameOver');
  const gameOverTitle = document.getElementById('gameOverTitle');
  const currentScoreDisplay = document.getElementById('currentScoreDisplay');
  const bestScoreGameOver = document.getElementById('bestScoreGameOver');
  const startOverlay = document.getElementById('startOverlay');
  const recordToast = document.getElementById('recordToast');
  const startBtn = document.getElementById('startBtn');
  const restartBtn = document.getElementById('restartBtn');

  return {
    startBtn,
    restartBtn,

    // Actualiza marcador de la partida actual.
    setScore(value) {
      setText(score, `Puntuación: ${value}`);
    },

    // Sincroniza mejor puntaje en todas las pantallas donde se muestra.
    setBestScore(value) {
      setText(bestScore, `Mejor Puntuación: ${value}`);
      setText(bestScoreStart, `Mejor Puntuación: ${value}`);
      setText(bestScoreGameOver, `Mejor Puntuación: ${value}`);
    },

    // Overlay de bienvenida antes de iniciar.
    showStart() {
      startOverlay.style.display = 'flex';
    },

    hideStart() {
      startOverlay.style.display = 'none';
    },

    // Pantalla de game over con mensaje dinamico segun hubo record o no.
    showGameOver(currentScore, isNewRecord) {
      setText(currentScoreDisplay, `Tu Puntuación: ${currentScore}`);

      if (isNewRecord) {
        setText(gameOverTitle, '¡Felicidades, nuevo récord!');
      } else {
        setText(gameOverTitle, '¡Casi lo logras! Sigue intentándolo, pronto romperás tu marca.');
      }

      gameOver.style.display = 'block';
    },

    hideGameOver() {
      gameOver.style.display = 'none';
    },

    // Notificacion temporal cuando se supera el mejor puntaje.
    showRecordToast() {
      recordToast.classList.add('visible');
      setTimeout(() => {
        recordToast.classList.remove('visible');
      }, 2500);
    },
  };
}

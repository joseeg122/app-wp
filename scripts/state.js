import { createMetrics, STORAGE_KEYS } from './config.js';

// Lee el mejor puntaje guardado y devuelve 0 si no existe o es invalido.
function readStoredBestScore() {
  const storedValue = parseInt(localStorage.getItem(STORAGE_KEYS.bestScore), 10);
  return Number.isNaN(storedValue) ? 0 : storedValue;
}

// Fabrica del ave con posicion inicial y velocidad neutra.
function createBird(metrics, canvasHeight) {
  return {
    x: metrics.birdX,
    y: canvasHeight / 2,
    w: metrics.birdWidth,
    h: metrics.birdHeight,
    velocity: 0,
  };
}

// Crea el estado raiz del juego para una sesion completa.
export function createGameState(canvasWidth, canvasHeight) {
  const metrics = createMetrics(canvasWidth, canvasHeight);

  return {
    phase: 'start',
    canvas: { width: canvasWidth, height: canvasHeight },
    metrics,
    bird: createBird(metrics, canvasHeight),
    pipes: [],
    score: 0,
    bestScore: readStoredBestScore(),
  };
}

// Reinicia solo la ronda actual sin perder el mejor puntaje.
export function resetRound(state) {
  state.bird = createBird(state.metrics, state.canvas.height);
  state.pipes = [];
  state.score = 0;
}

// mantiene el mejor puntaje actual en almacenamiento local.
export function persistBestScore(score) {
  localStorage.setItem(STORAGE_KEYS.bestScore, String(score));
}

// Actualiza y guarda el mejor puntaje unicamente cuando se supera el valor previo.
export function updateBestScoreIfNeeded(state) {
  if (state.score > state.bestScore) {
    state.bestScore = state.score;
    persistBestScore(state.bestScore);
    return true;
  }

  return false;
}

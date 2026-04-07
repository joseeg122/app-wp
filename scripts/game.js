// Dependencias por responsabilidad: estado, fisica, entidades, render, UI, audio e input.
import { createGameState, resetRound, updateBestScoreIfNeeded } from './state.js';
import { updateBird, jumpBird } from './physics.js';
import { updatePipes } from './pipes.js';
import { hasCollision } from './collision.js';
import { renderFrame } from './renderer.js';
import { createUI } from './ui.js';
import { createAudioManager } from './audio.js';
import { bindInputHandlers } from './input.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ajuste a pantalla completa
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Estado y servicios de la aplicacion.
const state = createGameState(canvas.width, canvas.height);
const ui = createUI();
const audio = createAudioManager();

// Estado visual inicial al cargar la pagina.
ui.setScore(0);
ui.setBestScore(state.bestScore);
ui.hideGameOver();
ui.showStart();
renderFrame(ctx, state);

// Loop principal: actualiza simulacion, valida colisiones y vuelve a dibujar cada frame.
function gameLoop() {
  // El loop solo corre durante la fase de juego activa.
  if (state.phase !== 'playing') {
    return;
  }

  // Actualizacion de mundo por frame.
  updateBird(state);
  updatePipes(state);
  ui.setScore(state.score);

  // Si hay colision, se corta el loop y se ejecuta cierre de partida.
  if (hasCollision(state)) {
    endGame();
    return;
  }

  // Render de frame y solicitud del siguiente ciclo.
  renderFrame(ctx, state);
  requestAnimationFrame(gameLoop);
}

// Arranque de partida: reinicia ronda, oculta overlays y enciende audio.
function startGame() {
  resetRound(state);
  state.phase = 'playing';

  ui.setScore(0);
  ui.hideStart();
  ui.hideGameOver();

  audio.startRound();
  gameLoop();
}

// Cierre de partida: detiene audio, actualiza record y muestra resumen de game over.
function endGame() {
  // Proteccion para evitar ejecutar cierre dos veces seguidas.
  if (state.phase !== 'playing') {
    return;
  }

  state.phase = 'gameOver';
  audio.stopBackground();
  audio.playDeath();

  const isNewRecord = updateBestScoreIfNeeded(state);
  ui.setBestScore(state.bestScore);

  if (isNewRecord) {
    ui.showRecordToast();
  }

  ui.showGameOver(state.score, isNewRecord);
}

// Reinicio simple: reutiliza el flujo normal de inicio.
function restartGame() {
  startGame();
}

// Entrada principal del jugador (tecla/click/tap): inicia, reinicia o hace salto segun fase.
function handlePrimaryAction() {
  if (state.phase === 'start') {
    startGame();
    return;
  }

  if (state.phase === 'gameOver') {
    restartGame();
    return;
  }

  jumpBird(state);
}

// Enlace de eventos de UI e input hacia el controlador principal.
bindInputHandlers({
  canvas,
  startButton: ui.startBtn,
  restartButton: ui.restartBtn,
  onPrimaryAction: handlePrimaryAction,
  onStart: startGame,
  onRestart: restartGame,
});

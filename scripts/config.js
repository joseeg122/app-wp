//localStorage.
export const STORAGE_KEYS = {
  bestScore: 'flappyBestScore',
};

// Calcula todas las medidas escaladas segun el tamano real del canvas.
export function createMetrics(canvasWidth, canvasHeight) {
  const scaleX = canvasWidth / 400;
  const scaleY = canvasHeight / 600;

  // Medidas tomadas en 400x600 y despues escaladas segun el dispositivo
  return {
    scaleX,
    scaleY,
    birdX: 60 * scaleX,
    birdWidth: 28 * scaleX,
    birdHeight: 20 * scaleY,
    gravity: 0.22 * scaleY,
    jumpPower: -5 * scaleY,
    maxFallSpeed: 3.8 * scaleY,
    pipeWidth: 50 * scaleX,
    pipeSpeed: 1 * scaleX,
    pipeGap: 150 * scaleY,
    minPipeTop: 60 * scaleY,
    spawnDistance: 220 * scaleX,
  };
}

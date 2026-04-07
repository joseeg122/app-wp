// Crea una tuberia nueva con altura aleatoria y gap fijo.
function createPipe(state) {
  const minTop = state.metrics.minPipeTop;
  const maxTop = state.canvas.height - state.metrics.pipeGap - state.metrics.minPipeTop;
  const top = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;

  return {
    x: state.canvas.width,
    top,
    bottom: top + state.metrics.pipeGap,
    passed: false,
  };
}

// Gestiona spawn, movimiento, puntuacion por pipes superados y limpieza de pipes fuera de pantalla.
export function updatePipes(state) {
  const { pipeSpeed, pipeWidth, spawnDistance } = state.metrics;

  // Si no hay pipes o la ultima ya avanzo suficiente, se crea una nueva.
  if (!state.pipes.length || state.pipes[state.pipes.length - 1].x < spawnDistance) {
    state.pipes.push(createPipe(state));
  }

  let scoreDelta = 0;

  for (const pipe of state.pipes) {
    pipe.x -= pipeSpeed;

    // Suma puntaje una sola vez cuando el ave ya rebaso la tuberia.
    if (!pipe.passed && pipe.x + pipeWidth < state.bird.x) {
      pipe.passed = true;
      scoreDelta += 1;
    }
  }

  // Elimina tuberias que ya no son visibles y aplica puntaje acumulado del frame.
  state.pipes = state.pipes.filter((pipe) => pipe.x + pipeWidth >= 0);
  state.score += scoreDelta;

  return scoreDelta;
}

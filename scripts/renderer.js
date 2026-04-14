// Render principal del frame: limpia y dibuja entidades visibles.
export function renderFrame(ctx, state) {
  ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
  drawBird(ctx, state.bird);
  drawPipes(ctx, state.pipes, state.metrics.pipeWidth, state.canvas.height);
}

// Dibuja el pajaro con relleno y borde.
function drawBird(ctx, bird) {
  ctx.fillStyle = '#ffeb3b';
  ctx.fillRect(bird.x, bird.y, bird.w, bird.h);
  ctx.strokeStyle = '#ef6c00';
  ctx.strokeRect(bird.x, bird.y, bird.w, bird.h);
}

// Dibuja cada par de tuberias (superior e inferior).
function drawPipes(ctx, pipes, pipeWidth, canvasHeight) {
  ctx.fillStyle = '#2e7d32';
  for (const pipe of pipes) {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvasHeight - pipe.bottom);
  }
}

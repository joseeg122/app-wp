// Evalua si el pajaro se choca con limites verticales o con alguna tuberia
export function hasCollision(state) {
  const { bird } = state;
  const { pipeWidth } = state.metrics;

  // Colision por salir del area visible (techo o suelo)
  if (bird.y < 0 || bird.y + bird.h > state.canvas.height) {
    return true;
  }

  // Colision contra tuberias: interseccion en X y luego validacion fuera del gap.
  for (const pipe of state.pipes) {
    const intersectsX = bird.x < pipe.x + pipeWidth && bird.x + bird.w > pipe.x;
    if (!intersectsX) {
      continue;
    }

    const outsideGap = bird.y < pipe.top || bird.y + bird.h > pipe.bottom;
    if (outsideGap) {
      return true;
    }
  }

  return false;
}

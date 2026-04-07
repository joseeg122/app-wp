// Aplica gravedad y avanza la posicion vertical del ave por frame.
export function updateBird(state) {
  state.bird.velocity += state.metrics.gravity;
  state.bird.velocity = Math.min(state.bird.velocity, state.metrics.maxFallSpeed);
  state.bird.y += state.bird.velocity;
}

// Fuerza un salto asignando velocidad vertical negativa.
export function jumpBird(state) {
  state.bird.velocity = state.metrics.jumpPower;
}

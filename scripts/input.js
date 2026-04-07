// Registra entradas de teclado y UI, y devuelve una funcion para desregistrarlas.
export function bindInputHandlers({ canvas, startButton, restartButton, onPrimaryAction, onStart, onRestart }) {
  // Espacio: accion principal (iniciar, saltar o reiniciar segun fase).
  function handleKeyDown(event) {
    if (event.code === 'Space') {
      event.preventDefault();
      onPrimaryAction();
    }
  }

  // Click/tap sobre canvas reutiliza la accion principal.
  function handleCanvasClick() {
    onPrimaryAction();
  }

  // Boton de inicio explicito.
  function handleStartClick() {
    onStart();
  }

  // Boton de reinicio explicito.
  function handleRestartClick() {
    onRestart();
  }

  // Suscripciones activas para toda la vida de la pantalla de juego.
  window.addEventListener('keydown', handleKeyDown);
  canvas.addEventListener('click', handleCanvasClick);
  startButton.addEventListener('click', handleStartClick);
  restartButton.addEventListener('click', handleRestartClick);

  // Limpieza opcional por si se desmonta la vista en el futuro.
  return function unbind() {
    window.removeEventListener('keydown', handleKeyDown);
    canvas.removeEventListener('click', handleCanvasClick);
    startButton.removeEventListener('click', handleStartClick);
    restartButton.removeEventListener('click', handleRestartClick);
  };
}

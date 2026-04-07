// Encapsula toda la logica de audio (musica de fondo y efecto de muerte).
export function createAudioManager() {
  const bgMusic = document.getElementById('bgMusic');
  const deathSound = document.getElementById('dieSound');
  let deathPlayed = false;

  // Intenta reproducir musica de fondo y si no deja se pone en mute
  function playBackground() {
    if (!bgMusic.paused) {
      return;
    }

    bgMusic.volume = 0.3;
    bgMusic.muted = false;
    bgMusic.currentTime = 0;

    bgMusic.play().catch(() => {
      bgMusic.muted = true;
      bgMusic.play().catch(() => {});
    });
  }

  // Primer gesto del usuario para desbloquear audio en navegadores moviles.
  function unlockOnFirstGesture() {
    if (bgMusic.paused) {
      bgMusic.volume = 0.3;
      bgMusic.muted = false;
      bgMusic.currentTime = 0;
      bgMusic.play().catch(() => {});
    }
  }

  window.addEventListener('touchstart', unlockOnFirstGesture, { once: true });
  window.addEventListener('click', unlockOnFirstGesture, { once: true });

  return {
    // Inicia musica al empezar ronda y habilita nuevamente SFX de muerte.
    startRound() {
      deathPlayed = false;
      playBackground();
    },

    // Detiene y reinicia la pista de fondo.
    stopBackground() {
      if (bgMusic.paused) {
        return;
      }

      bgMusic.pause();
      bgMusic.currentTime = 0;
    },

    // Reproduce el sonido de muerte una sola vez por partida.
    playDeath() {
      if (deathPlayed) {
        return;
      }

      deathSound.play().catch(() => {});
      deathPlayed = true;
    },
  };
}

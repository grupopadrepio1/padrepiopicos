// assets/js/music-player.js
const MUSIC_CATALOG_URL = "https://raw.githubusercontent.com/grupopadrepio1/music-missas/main/catalogo.json";

async function loadPlaylist() {
  const response = await fetch(MUSIC_CATALOG_URL);
  if (!response.ok) throw new Error(`Catálogo indisponível (${response.status})`);

  const catalog = await response.json();
  if (!Array.isArray(catalog.missas) || !Array.isArray(catalog.movimentos) || !catalog.baseUrl) {
    throw new Error("Catálogo inválido");
  }

  const baseUrl = catalog.baseUrl.replace(/\/$/, "");
  const credits = "Cantores Carmeli Linz · dir. Michael Stenov · CC BY-SA 4.0";

  return catalog.missas.flatMap((missa) => catalog.movimentos.map((movimento) => ({
    title: `${missa.titulo} — ${movimento.titulo}`,
    artist: `${missa.compositor} · ${credits}`,
    src: `${baseUrl}/${missa.pasta}/${movimento.arquivo}`,
  })));
}

// Tornar a inicializacao resiliente caso o footer ainda nao tenha sido injetado.
async function initMusicPlayer() {
  const audio = document.getElementById("audio-player");
  const playBtn = document.getElementById("play-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const shuffleBtn = document.getElementById("shuffle-btn");
  const titleEl = document.getElementById("track-title");
  const artistEl = document.getElementById("track-artist");
  const progressBar = document.getElementById("progress-bar");
  const volumeControl = document.getElementById("volume-control");

  if (!audio || !playBtn || !prevBtn || !nextBtn || !titleEl || !artistEl) return false;

  titleEl.textContent = "Carregando missas documentadas…";
  artistEl.textContent = "Catálogo IMSLP / Stenov";

  let playlist = [];
  try {
    playlist = await loadPlaylist();
  } catch (error) {
    console.warn("Não foi possível carregar o catálogo musical.", error);
  }

  if (!playlist.length) {
    audio.removeAttribute("src");
    audio.load();
    titleEl.textContent = "Catálogo musical indisponível";
    artistEl.textContent = "Tente novamente em instantes.";
    [playBtn, prevBtn, nextBtn, shuffleBtn].forEach((button) => {
      if (button) button.disabled = true;
    });
    return true;
  }

  let currentTrack = 0;
  let isSeeking = false;

  function loadTrack(index) {
    const track = playlist[index];
    audio.src = encodeURI(track.src);
    audio.load();
    titleEl.textContent = track.title;
    artistEl.textContent = track.artist;
    if (progressBar) progressBar.value = 0;
  }

  function play() {
    audio.play()
      .then(() => {
        playBtn.textContent = "❚❚";
      })
      .catch(() => {
        playBtn.textContent = "▶︎";
      });
  }

  function pause() {
    audio.pause();
    playBtn.textContent = "▶︎";
  }

  function togglePlay() {
    audio.paused ? play() : pause();
  }

  function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    play();
  }

  function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    play();
  }

  playBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);
  audio.addEventListener("ended", nextTrack);
  audio.addEventListener("pause", () => {
    playBtn.textContent = "▶︎";
  });

  if (shuffleBtn) {
    shuffleBtn.disabled = true;
    shuffleBtn.title = "As missas seguem a ordem litúrgica";
    shuffleBtn.style.opacity = "0.4";
  }

  progressBar?.addEventListener("pointerdown", () => {
    isSeeking = true;
  });
  progressBar?.addEventListener("pointerup", () => {
    isSeeking = false;
    if (audio.duration) audio.currentTime = (progressBar.value / 100) * audio.duration;
  });

  audio.addEventListener("timeupdate", () => {
    if (!progressBar || !audio.duration || isSeeking) return;
    progressBar.value = (audio.currentTime / audio.duration) * 100;
  });

  volumeControl?.addEventListener("input", () => {
    audio.volume = volumeControl.value;
  });
  if (volumeControl) audio.volume = volumeControl.value;

  loadTrack(currentTrack);

  return true;
}

function startMusicPlayer() {
  if (document.getElementById("audio-player")) {
    initMusicPlayer();
    return;
  }

  const mo = new MutationObserver((mutations, obs) => {
    if (document.getElementById("audio-player")) {
      initMusicPlayer();
      obs.disconnect();
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });
}

startMusicPlayer();

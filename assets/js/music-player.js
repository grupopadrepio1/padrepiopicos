// assets/js/music-player.js
// Tornar a inicializacao resiliente caso o footer ainda nao tenha sido injetado.
function initMusicPlayer() {
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

  const playlist = [
    {
      title: "Beatus Populus - Coral Taizé",
      artist: "Música Sacra",
      src: "assets/audio/Beatus Populus - Coral Taizé.mp3"
    },
    {
      title: "Miserere Domine - Coro e Cordas",
      artist: "Música Sacra",
      src: "assets/audio/Miserere Domine - Coro e Cordas.mp3"
    },
    {
      title: "Miserere Domine - Coro e Cordas Final",
      artist: "Música Sacra",
      src: "assets/audio/Miserere Domine - Coro e Cordas Final.mp3"
    },
    {
      title: "Miserere Domine - Taizé Style",
      artist: "Música Sacra",
      src: "assets/audio/Miserere Domine - Taizé Style.mp3"
    },
    {
      title: "O Deus que Fala",
      artist: "Música Sacra",
      src: "assets/audio/O Deus que Fala.mp3"
    },
    {
      title: "O Deus que Fala - Cathedral Version",
      artist: "Música Sacra",
      src: "assets/audio/O Deus que Fala - Cathedral Version.mp3"
    }
  ];

  let currentTrack = Math.floor(Math.random() * playlist.length);
  let shuffle = false;
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
    currentTrack = shuffle
      ? Math.floor(Math.random() * playlist.length)
      : (currentTrack + 1) % playlist.length;
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

  shuffleBtn?.addEventListener("click", () => {
    shuffle = !shuffle;
    shuffleBtn.style.opacity = shuffle ? "1" : "0.4";
  });

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

if (!initMusicPlayer()) {
  const mo = new MutationObserver((mutations, obs) => {
    if (document.getElementById("audio-player")) {
      initMusicPlayer();
      obs.disconnect();
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });
}

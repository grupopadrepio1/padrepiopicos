// assets/js/music-player.js
// Tornar a inicialização resiliente caso o footer ainda não tenha sido injetado
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

  if (!audio || !playBtn) return false;

  /* =========================
    PLAYLIST COMPLETA
  ========================== */
  const playlist = [
    {
        "title": "01 - Anima Christi (Pane di vita nuova)",
        "artist": "Música Sacra",
        "src": "assets/audio/01 - Anima Christi (Pane di vita nuova).mp3"
    },
    {
        "title": "01 - Crucem Tuam - Antifona para Sexta Feira Santa",
        "artist": "Música Sacra",
        "src": "assets/audio/01 - Crucem Tuam - Antifona para Sexta Feira Santa.mp3"
    },
    {
        "title": "01 - Missa cum jubilo - Kyrie",
        "artist": "Música Sacra",
        "src": "assets/audio/01 - Missa cum jubilo - Kyrie.mp3"
    },
    {
        "title": "02 - Adoro te devote",
        "artist": "Música Sacra",
        "src": "assets/audio/02 - Adoro te devote.mp3"
    },
    {
        "title": "02 - Ave Regina Caelorum",
        "artist": "Música Sacra",
        "src": "assets/audio/02 - Ave Regina Caelorum.mp3"
    },
    {
        "title": "02 - Missa cum jubilo - Gloria",
        "artist": "Música Sacra",
        "src": "assets/audio/02 - Missa cum jubilo - Gloria.mp3"
    },
    {
        "title": "03 - Missa cum jubilo - Sanctus",
        "artist": "Música Sacra",
        "src": "assets/audio/03 - Missa cum jubilo - Sanctus.mp3"
    },
    {
        "title": "03 - O salutaris Hostia",
        "artist": "Música Sacra",
        "src": "assets/audio/03 - O salutaris Hostia.mp3"
    },
    {
        "title": "03 - Salve Regina",
        "artist": "Música Sacra",
        "src": "assets/audio/03 - Salve Regina.mp3"
    },
    {
        "title": "04 - Lauda Sion",
        "artist": "Música Sacra",
        "src": "assets/audio/04 - Lauda Sion.mp3"
    },
    {
        "title": "04 - Missa cum jubilo - Agnus Dei",
        "artist": "Música Sacra",
        "src": "assets/audio/04 - Missa cum jubilo - Agnus Dei.mp3"
    },
    {
        "title": "04 - Regina Caeli",
        "artist": "Música Sacra",
        "src": "assets/audio/04 - Regina Caeli.mp3"
    },
    {
        "title": "05 - Alma Redemptoris Mater",
        "artist": "Música Sacra",
        "src": "assets/audio/05 - Alma Redemptoris Mater.mp3"
    },
    {
        "title": "05 - Ego sum panis vivus",
        "artist": "Música Sacra",
        "src": "assets/audio/05 - Ego sum panis vivus.mp3"
    },
    {
        "title": "05 - Missa orbis factor - Kyrie",
        "artist": "Música Sacra",
        "src": "assets/audio/05 - Missa orbis factor - Kyrie.mp3"
    },
    {
        "title": "06 - Ave Maria em Latim",
        "artist": "Música Sacra",
        "src": "assets/audio/06 - Ave Maria em Latim.mp3"
    },
    {
        "title": "06 - Iesu dulcis memoria",
        "artist": "Música Sacra",
        "src": "assets/audio/06 - Iesu dulcis memoria.mp3"
    },
    {
        "title": "06 - Missa orbis factor - Gloria",
        "artist": "Música Sacra",
        "src": "assets/audio/06 - Missa orbis factor - Gloria.mp3"
    },
    {
        "title": "07 - Missa orbis factor - Credo",
        "artist": "Música Sacra",
        "src": "assets/audio/07 - Missa orbis factor - Credo.mp3"
    },
    {
        "title": "07 - O magnum Mysterium",
        "artist": "Música Sacra",
        "src": "assets/audio/07 - O magnum Mysterium.mp3"
    },
    {
        "title": "07 - Pater Noster",
        "artist": "Música Sacra",
        "src": "assets/audio/07 - Pater Noster.mp3"
    },
    {
        "title": "08 - Cibavit eos",
        "artist": "Música Sacra",
        "src": "assets/audio/08 - Cibavit eos.mp3"
    },
    {
        "title": "08 - Missa orbis factor - Sanctus",
        "artist": "Música Sacra",
        "src": "assets/audio/08 - Missa orbis factor - Sanctus.mp3"
    },
    {
        "title": "08 - Victimae Paschali",
        "artist": "Música Sacra",
        "src": "assets/audio/08 - Victimae Paschali.mp3"
    },
    {
        "title": "09 - Ad cenam Agni providi",
        "artist": "Música Sacra",
        "src": "assets/audio/09 - Ad cenam Agni providi.mp3"
    },
    {
        "title": "09 - Hosanna Filio David - Cântico para o Domingo de Ramos",
        "artist": "Música Sacra",
        "src": "assets/audio/09 - Hosanna Filio David - Cântico para o Domingo de Ramos.mp3"
    },
    {
        "title": "09 - Missa orbis factor - Agnus Dei",
        "artist": "Música Sacra",
        "src": "assets/audio/09 - Missa orbis factor - Agnus Dei.mp3"
    },
    {
        "title": "10 - Ave verum",
        "artist": "Música Sacra",
        "src": "assets/audio/10 - Ave verum.mp3"
    },
    {
        "title": "10 - Gloria Laus - Cântico para a Procissão de Ramos",
        "artist": "Música Sacra",
        "src": "assets/audio/10 - Gloria Laus - Cântico para a Procissão de Ramos.mp3"
    },
    {
        "title": "10 - Missa de angelis - Kyrie",
        "artist": "Música Sacra",
        "src": "assets/audio/10 - Missa de angelis - Kyrie.mp3"
    },
    {
        "title": "11 - Missa de angelis - Gloria",
        "artist": "Música Sacra",
        "src": "assets/audio/11 - Missa de angelis - Gloria.mp3"
    },
    {
        "title": "11 - Quinta Feira Santa-Evangelho cantado em Latim",
        "artist": "Música Sacra",
        "src": "assets/audio/11 - Quinta Feira Santa-Evangelho cantado em Latim.mp3"
    },
    {
        "title": "12 - Missa de angelis - Credo",
        "artist": "Música Sacra",
        "src": "assets/audio/12 - Missa de angelis - Credo.mp3"
    },
    {
        "title": "12 - Nos autem gloriari - Canto de entrada para Quinta Feira Santa",
        "artist": "Música Sacra",
        "src": "assets/audio/12 - Nos autem gloriari - Canto de entrada para Quinta Feira Santa.mp3"
    },
    {
        "title": "13 - Dominus Jesus - Cântico para comunhão - Quinta Feira Santa",
        "artist": "Música Sacra",
        "src": "assets/audio/13 - Dominus Jesus - Cântico para comunhão - Quinta Feira Santa.mp3"
    },
    {
        "title": "13 - Missa de angelis - Sanctus",
        "artist": "Música Sacra",
        "src": "assets/audio/13 - Missa de angelis - Sanctus.mp3"
    },
    {
        "title": "14 - Missa de angelis - Agnus Dei",
        "artist": "Música Sacra",
        "src": "assets/audio/14 - Missa de angelis - Agnus Dei.mp3"
    },
    {
        "title": "14 - Ubi Caritas et Amor",
        "artist": "Música Sacra",
        "src": "assets/audio/14 - Ubi Caritas et Amor.mp3"
    },
    {
        "title": "15 - Da pacem, Domine - III modo",
        "artist": "Música Sacra",
        "src": "assets/audio/15 - Da pacem, Domine - III modo.mp3"
    },
    {
        "title": "15 - Sexta Feira Santa-Evangelho cantado em Latim",
        "artist": "Música Sacra",
        "src": "assets/audio/15 - Sexta Feira Santa-Evangelho cantado em Latim.mp3"
    },
    {
        "title": "16 - Ecce Lignum Crucis-Canto gregoriano da Sexta Feira Santa",
        "artist": "Música Sacra",
        "src": "assets/audio/16 - Ecce Lignum Crucis-Canto gregoriano da Sexta Feira Santa.mp3"
    },
    {
        "title": "16 - Iustus ut palma florebit - II modo",
        "artist": "Música Sacra",
        "src": "assets/audio/16 - Iustus ut palma florebit - II modo.mp3"
    },
    {
        "title": "17 - Ad Te levavi - VIII modo",
        "artist": "Música Sacra",
        "src": "assets/audio/17 - Ad Te levavi - VIII modo.mp3"
    },
    {
        "title": "17 - Sábado de aleluia - Evangelho cantado em Latim",
        "artist": "Música Sacra",
        "src": "assets/audio/17 - Sábado de aleluia - Evangelho cantado em Latim.mp3"
    },
    {
        "title": "18 - Domingo de Pascoa- Evangelho cantado",
        "artist": "Música Sacra",
        "src": "assets/audio/18 - Domingo de Pascoa- Evangelho cantado.mp3"
    },
    {
        "title": "18 - Populus Sion - VII modo",
        "artist": "Música Sacra",
        "src": "assets/audio/18 - Populus Sion - VII modo.mp3"
    },
    {
        "title": "19 - Gaudete in Domino - I modo",
        "artist": "Música Sacra",
        "src": "assets/audio/19 - Gaudete in Domino - I modo.mp3"
    },
    {
        "title": "19 - Resurrexi - Lindo canto gregoriano para Páscoa.",
        "artist": "Música Sacra",
        "src": "assets/audio/19 - Resurrexi - Lindo canto gregoriano para Páscoa..mp3"
    },
    {
        "title": "20 - Puer Natus - Canto gregoriano da Missa de Natal - Mosteiro de São Bento",
        "artist": "Música Sacra",
        "src": "assets/audio/20 - Puer Natus - Canto gregoriano da Missa de Natal - Mosteiro de São Bento.mp3"
    },
    {
        "title": "20 - Sitientes venite ad aquas - II modo",
        "artist": "Música Sacra",
        "src": "assets/audio/20 - Sitientes venite ad aquas - II modo.mp3"
    },
    {
        "title": "21 - ADORO TE DEVOTE Canto Gregoriano escrito por Santo Tomas de Aquino",
        "artist": "Música Sacra",
        "src": "assets/audio/21 - ADORO TE DEVOTE Canto Gregoriano escrito por Santo Tomas de Aquino.mp3"
    },
    {
        "title": "21 - Narrabo omnia mirabilia tua - II modo",
        "artist": "Música Sacra",
        "src": "assets/audio/21 - Narrabo omnia mirabilia tua - II modo.mp3"
    },
    {
        "title": "22 - Gloria in excelsis Deo - IV modo",
        "artist": "Música Sacra",
        "src": "assets/audio/22 - Gloria in excelsis Deo - IV modo.mp3"
    },
    {
        "title": "22 - Ladainha de Todos os Santos, em Canto Gregoriano em Latim",
        "artist": "Música Sacra",
        "src": "assets/audio/22 - Ladainha de Todos os Santos, em Canto Gregoriano em Latim.mp3"
    },
    {
        "title": "23 - Salve Regina - I modo",
        "artist": "Música Sacra",
        "src": "assets/audio/23 - Salve Regina - I modo.mp3"
    },
    {
        "title": "24 - Ave Maria - I modo",
        "artist": "Música Sacra",
        "src": "assets/audio/24 - Ave Maria - I modo.mp3"
    },
    {
        "title": "25 - Florete flores - I modo",
        "artist": "Música Sacra",
        "src": "assets/audio/25 - Florete flores - I modo.mp3"
    },
    {
        "title": "26 - Aqua sapientiae - VII modo",
        "artist": "Música Sacra",
        "src": "assets/audio/26 - Aqua sapientiae - VII modo.mp3"
    },
    {
        "title": "27 - Dies Irae - I modo",
        "artist": "Música Sacra",
        "src": "assets/audio/27 - Dies Irae - I modo.mp3"
    }
];

  // Começa com música aleatória
  let currentTrack = Math.floor(Math.random() * playlist.length);
  let shuffle = false;
  let isSeeking = false;

  /* =========================
     FUNÇÕES
  ========================== */
  function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    audio.load();
    titleEl.textContent = track.title;
    artistEl.textContent = track.artist;
    progressBar.value = 0;
  }

  function play() {
    audio.play();
    playBtn.textContent = "❚❚";
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

  /* =========================
     EVENTOS
  ========================== */
  playBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);
  audio.addEventListener("ended", nextTrack);

  shuffleBtn?.addEventListener("click", () => {
    shuffle = !shuffle;
    shuffleBtn.style.opacity = shuffle ? "1" : "0.4";
  });

  // Barra de progresso
  progressBar?.addEventListener("pointerdown", () => isSeeking = true);
  progressBar?.addEventListener("pointerup", () => {
    isSeeking = false;
    if (audio.duration) audio.currentTime = (progressBar.value / 100) * audio.duration;
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration || isSeeking) return;
    progressBar.value = (audio.currentTime / audio.duration) * 100;
  });

  // Volume
  volumeControl?.addEventListener("input", () => {
    audio.volume = volumeControl.value;
  });
  if (volumeControl) audio.volume = volumeControl.value;

  /* =========================
     INICIALIZAÇÃO
  ========================== */
  loadTrack(currentTrack);

  return true;
}

// Tenta inicializar imediatamente; se os elementos não existirem ainda, observa o body e inicializa quando o audio aparecer
if (!initMusicPlayer()) {
  const mo = new MutationObserver((mutations, obs) => {
    if (document.getElementById('audio-player')) {
      initMusicPlayer();
      obs.disconnect();
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });
}

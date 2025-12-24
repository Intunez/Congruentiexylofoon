const mallet = document.getElementById("mallet");
const xylo = document.getElementById("xylo");

/* VASTE VOLGORDE: links → rechts */
const notes = [
  "dolaag",
  "relaag",
  "milaag",
  "falaag",
  "sol",
  "la",
  "si",
  "dohoog",
  "rehoog",
  "mihoog",
  "fahoog"
];

// audio cache (sneller + stabiel)
const audioCache = {};

function playNote(note) {
  const url = `assets/sounds/${note}.mp3`;

  if (!audioCache[note]) {
    audioCache[note] = new Audio(url);
  }

  const audio = audioCache[note];
  audio.currentTime = 0;

  const p = audio.play();
  if (p && typeof p.catch === "function") {
    p.catch((err) => console.error("Audio play() mislukte:", url, err));
  }
}

function showMalletAt(clientX, clientY) {
  const rect = xylo.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  mallet.style.left = `${x}px`;
  mallet.style.top = `${y}px`;

  mallet.classList.remove("hit");
  void mallet.offsetWidth;
  mallet.classList.add("hit");

  clearTimeout(mallet._t);
  mallet._t = setTimeout(() => {
    mallet.classList.remove("hit");
  }, 200);
}

document.querySelectorAll(".key").forEach((key, index) => {
  key.addEventListener(
    "pointerdown",
    (ev) => {
      ev.preventDefault();

      const note = notes[index];
      playNote(note);

      showMalletAt(ev.clientX, ev.clientY);
    },
    { passive: false }
  );
});

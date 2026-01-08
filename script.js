const mallet = document.getElementById("mallet");
const xylo = document.getElementById("xylo");

/* 7 noten: toets 1 → toets 7 */
const notes = [
  "dolaag",
  "relaag",
  "milaag",
  "falaag",
  "sol",
  "la",
  "si"
];

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
  mallet.style.left = `${clientX - rect.left}px`;
  mallet.style.top  = `${clientY - rect.top}px`;

  mallet.classList.remove("hit");
  void mallet.offsetWidth;
  mallet.classList.add("hit");

  clearTimeout(mallet._t);
  mallet._t = setTimeout(() => mallet.classList.remove("hit"), 200);
}

document.querySelectorAll(".key").forEach((key, index) => {
  key.addEventListener("pointerdown", (ev) => {
    ev.preventDefault();
    playNote(notes[index]);
    showMalletAt(ev.clientX, ev.clientY);
  }, { passive: false });
});

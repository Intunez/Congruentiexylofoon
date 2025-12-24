const mallet = document.getElementById("mallet");
const xylo = document.getElementById("xylo");

/* VASTE NOOTVOLGORDE: links → rechts */
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

const audioCache = {};

function playNote(note) {
  const url = `assets/sounds/${note}.mp3`;

  if (!audioCache[note]) {
    audioCache[note] = new Audio(url);
  }

  const audio = audioCache[note];
  audio.currentTime = 0;
  audio.play();
}

function showMalletAt(clientX, clientY) {
  const rect = xylo.getBoundingClientRect();

  mallet.style.left = `${clientX - rect.left}px`;
  mallet.style.top  = `${clientY - rect.top}px`;

  mallet.classList.remove("hit");
  void mallet.offsetWidth;
  mallet.classList.add("hit");

  clearTimeout(mallet._t);
  mallet._t = setTimeout(() => {
    mallet.classList.remove("hit");
  }, 200);
}

/* KOPPELING: knop-index → noot */
document.querySelectorAll(".key").forEach((key, index) => {
  key.addEventListener("pointerdown", (ev) => {
    ev.preventDefault();
    playNote(notes[index]);
    showMalletAt(ev.clientX, ev.clientY);
  }, { passive: false });
});

const mallet = document.getElementById("mallet");
const xylo = document.getElementById("xylo");

/* VASTE NOOTVOLGORDE (links → rechts) */
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

// audio cache
const audioCache = new Map();

function playNote(note) {
  const url = `assets/sounds/${note}.mp3`;

  let audio = audioCache.get(note);
  if (!audio) {
    audio = new Audio(url);
    audioCache.set(note, audio);

    audio.addEventListener("error", () => {
      console.error("Kan audio niet laden:", url);
    });
  }

  audio.currentTime = 0;
  audio.play();
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

/* knop-index → noot */
document.querySelectorAll(".key").forEach((key, index) => {
  key.addEventListener("pointerdown", (ev) => {
    ev.preventDefault();
    const note = notes[index];
    playNote(note);
    showMalletAt(ev.clientX, ev.clientY);
  }, { passive: false });
});

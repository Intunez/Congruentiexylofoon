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
  // cache-busting: dwingt de browser om altijd de nieuwste mp3 op te halen
  const url = `assets/sounds/${note}.mp3?v=${Date.now()}`;

  console.log("Ik speel:", note, "=>", url);

  const audio = new Audio(url);

  audio.addEventListener("error", () => {
    console.error("Kan audio niet laden:", url);
  });

  audio.play().catch(err => console.error("play() fout:", err));
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

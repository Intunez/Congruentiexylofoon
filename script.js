const sounds = {
  dolaag: new Audio("assets/sounds/dolaag.wav"),
  relaag: new Audio("assets/sounds/relaag.wav"),
  milaag: new Audio("assets/sounds/milaag.wav"),
  falaag: new Audio("assets/sounds/falaag.wav"),
  sollaag: new Audio("assets/sounds/sollaag.wav"),
  la: new Audio("assets/sounds/la.wav"),
  silaag: new Audio("assets/sounds/silaag.wav"),
  dohoog: new Audio("assets/sounds/dohoog.wav"),
  rehoog: new Audio("assets/sounds/rehoog.wav"),
  mihoog: new Audio("assets/sounds/mihoog.wav"),
  fahoog: new Audio("assets/sounds/fahoog.wav")
};

const mallet = document.getElementById("mallet");
const xylo = document.getElementById("xylo");

function showMalletAt(clientX, clientY) {
  const xyloRect = xylo.getBoundingClientRect();
  const x = clientX - xyloRect.left;
  const y = clientY - xyloRect.top;

  mallet.style.left = `${x}px`;
  mallet.style.top  = `${y}px`;

  // animatie elke keer herstarten
  mallet.classList.remove("hit");
  void mallet.offsetWidth; // force reflow
  mallet.classList.add("hit");

  clearTimeout(mallet._t);
  mallet._t = setTimeout(() => {
    mallet.classList.remove("hit"); // wordt weer onzichtbaar door opacity:0
  }, 200);
}

// Gebruik zowel click als pointerdown (super robuust)
document.querySelectorAll(".key").forEach((key) => {
  const handler = (ev) => {
    ev.preventDefault();

    const note = key.dataset.note;
    const a = sounds[note];
    if (a) {
      a.currentTime = 0;
      a.play().catch(() => {});
    }

    // event-coördinaten
    const clientX = ev.clientX ?? (ev.touches && ev.touches[0].clientX);
    const clientY = ev.clientY ?? (ev.touches && ev.touches[0].clientY);
    if (clientX != null && clientY != null) {
      showMalletAt(clientX, clientY);
    }
  };

  key.addEventListener("pointerdown", handler, { passive: false });
  key.addEventListener("click", handler);
});

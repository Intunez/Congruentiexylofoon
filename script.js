const sounds = {
  dolaag: new Audio("assets/sounds/dolaag.mp3"),
  relaag: new Audio("assets/sounds/relaag.mp3"),
  milaag: new Audio("assets/sounds/milaag.mp3"),
  falaag: new Audio("assets/sounds/falaag.mp3"),
  sollaag: new Audio("assets/sounds/sollaag.mp3"),
  la: new Audio("assets/sounds/la.mp3"),
  silaag: new Audio("assets/sounds/silaag.mp3"),
  dohoog: new Audio("assets/sounds/dohoog.mp3"),
  rehoog: new Audio("assets/sounds/rehoog.mp3"),
  mihoog: new Audio("assets/sounds/mihoog.mp3"),
  fahoog: new Audio("assets/sounds/fahoog.mp3")
};

const mallet = document.getElementById("mallet");
const xylo = document.getElementById("xylo");

function showMalletAt(clientX, clientY) {
  const xyloRect = xylo.getBoundingClientRect();
  const x = clientX - xyloRect.left;
  const y = clientY - xyloRect.top;

  mallet.style.left = `${x}px`;
  mallet.style.top  = `${y}px`;

  // BELANGRIJK: elke keer opnieuw zichtbaar maken
  mallet.style.display = "block";

  // animatie opnieuw triggeren
  mallet.classList.remove("hit");
  void mallet.offsetWidth; // force reflow
  mallet.classList.add("hit");

  clearTimeout(mallet._t);
  mallet._t = setTimeout(() => {
    mallet.classList.remove("hit");
    mallet.style.display = "none";
  }, 180);
}

document.querySelectorAll(".key").forEach(key => {
  key.addEventListener("pointerdown", (ev) => {
    ev.preventDefault();

    const note = key.dataset.note;

    const a = sounds[note];
    if (a) {
      a.currentTime = 0;
      a.play().catch(console.error);
    }

    showMalletAt(ev.clientX, ev.clientY);
  });
});

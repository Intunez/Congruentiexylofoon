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

  mallet.classList.remove("hit");
  void mallet.offsetWidth; // reset animatie
  mallet.classList.add("hit");

  clearTimeout(mallet._t);
  mallet._t = setTimeout(() => {
    mallet.classList.remove("hit");
    mallet.style.display = "none";
  }, 170);
}

document.querySelectorAll(".key").forEach(key => {
  key.addEventListener("pointerdown", (ev) => {
    ev.preventDefault();

    const note = key.dataset.note;
    sounds[note].currentTime = 0;
    sounds[note].play();

    showMalletAt(ev.clientX, ev.clientY);
  });
});

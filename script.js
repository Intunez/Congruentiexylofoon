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

document.querySelectorAll(".key").forEach(key => {
  key.addEventListener("click", () => {
    const note = key.dataset.note;
    sounds[note].currentTime = 0;
    sounds[note].play();

    const rect = key.getBoundingClientRect();
    const xyloRect = xylo.getBoundingClientRect();

    mallet.style.left = (rect.left - xyloRect.left + rect.width / 2) + "px";
    mallet.style.top  = (rect.top - xyloRect.top + rect.height / 2) + "px";
    mallet.style.display = "block";

    setTimeout(() => {
      mallet.style.display = "none";
    }, 150);
  });
});

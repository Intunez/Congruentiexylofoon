const mallet = document.getElementById("mallet");
const xylo = document.getElementById("xylo");

function showMalletAt(clientX, clientY) {
  const xyloRect = xylo.getBoundingClientRect();
  const x = clientX - xyloRect.left;
  const y = clientY - xyloRect.top;

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

function playNote(note) {
  const url = `assets/sounds/${note}.wav`;
  const audio = new Audio(url);
  audio.currentTime = 0;
  audio.play();
}

document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener(
    "pointerdown",
    (ev) => {
      ev.preventDefault();

      const note = key.dataset.note;
      playNote(note);

      showMalletAt(ev.clientX, ev.clientY);
    },
    { passive: false }
  );
});

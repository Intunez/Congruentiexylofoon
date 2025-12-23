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
const note = key.dataset.note;
console.log("Je klikte:", note);
playNote(note);

function playNote(note) {
  const url = `assets/sounds/${note}.mp3`;
  const audio = new Audio(url);

  // 👉 DEBUG: toont fout als bestand niet bestaat
  audio.addEventListener("error", () => {
    console.error("Kan audio niet laden:", url);
  });

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

const mallet = document.getElementById("mallet");
const xylo = document.getElementById("xylo");

// Cache audio voor snellere respons
const audioCache = new Map();

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
  const url = `assets/sounds/${note}.mp3`;

  let audio = audioCache.get(note);
  if (!audio) {
    audio = new Audio(url);

    // Als bestand niet gevonden wordt, zie je het meteen in de console
    audio.addEventListener("error", () => {
      console.error("Kan audio niet laden:", url);
    });

    audioCache.set(note, audio);
  }

  // opnieuw starten
  audio.currentTime = 0;
  audio.play().catch((err) => {
    console.error("Audio play() mislukte:", url, err);
  });
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

const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");


// Audio Context erstellen
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const track = audioContext.createMediaElementSource(bgMusic);

// 3 EQ Bänder
const bass = audioContext.createBiquadFilter();
bass.type = "lowshelf";
bass.frequency.value = 200;

const mid = audioContext.createBiquadFilter();
mid.type = "peaking";
mid.frequency.value = 1000;

const treble = audioContext.createBiquadFilter();
treble.type = "highshelf";
treble.frequency.value = 3000;

// Verbinden: Audio → Bass → Mid → Treble → Output
track.connect(bass);
bass.connect(mid);
mid.connect(treble);
treble.connect(audioContext.destination);



// Musik Toggle
musicToggle.addEventListener("click", async () => {
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.classList.add("playing");
    eqContainer.classList.remove("hidden"); // SHOW
  } else {
    bgMusic.pause();
    musicToggle.classList.remove("playing");
    eqContainer.classList.add("hidden"); // HIDE
  }
});


const eqContainer = document.getElementById("eqContainer");
const knobs = document.querySelectorAll(".knob");

const filters = {
  bass: bass,
  mid: mid,
  treble: treble
};

knobs.forEach(knob => {
  let value = 0; // -30 bis +30 dB

  const updateKnob = () => {
    const rotation = (value + 30) * 4.5 - 135; 
    // map -30..30 auf -135..135
    knob.style.transform = `rotate(${rotation}deg)`;
    filters[knob.dataset.band].gain.value = value;
  };

  // Maus + Touch Drag
  const startDrag = (e) => {
    e.preventDefault();

    const move = (event) => {
      const movement = event.movementY || 
                       (event.touches ? event.touches[0].clientY : 0);

      value -= movement * 0.2;
      value = Math.max(-30, Math.min(30, value));
      updateKnob();
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("touchmove", move);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", move);
    }, { once: true });

    document.addEventListener("touchend", () => {
      document.removeEventListener("touchmove", move);
    }, { once: true });
  };

  knob.addEventListener("mousedown", startDrag);
  knob.addEventListener("touchstart", startDrag);

  // Tastatursteuerung
  knob.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") value += 1;
    if (e.key === "ArrowDown") value -= 1;

    value = Math.max(-30, Math.min(30, value));
    updateKnob();
  });

  updateKnob();
});

  // RAdioMusik 
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  
  // Beim Klick Musik toggeln
  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.classList.add("playing");
    } else {
      bgMusic.pause();
      musicToggle.classList.remove("playing");
    }
  });
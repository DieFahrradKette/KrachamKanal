  const sprueche = [
    "Krank am Kabel",
    "Voll verkabelt",
    "Wahnsinn",
    "Krach vom Fach",
    "Knall am Kanal",
    "Krank am knutschen"
  ];

  // random
  const zufallsSpruch = sprueche[Math.floor(Math.random() * sprueche.length)];

  document.addEventListener("DOMContentLoaded", () => {
    const subtitleElement = document.querySelector(".subtitle");
    if (subtitleElement) {
      subtitleElement.textContent = zufallsSpruch;
    }
  });


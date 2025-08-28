const koepfe = [
  "heads/kim.png",
  "heads/clemens.png",
  "heads/conni.png",
  "heads/vali.png",
  "heads/edo.png",
  "heads/julius.png"
];
const container = document.getElementById("muell-container");

let letztePositionen = [];

function erstelleKopf() {
  const img = document.createElement("img");
  img.src = koepfe[Math.floor(Math.random() * koepfe.length)];
  img.className = "muell";

  const größe = 30 + Math.random() * 20;

  // Zufällige Position mit Mindestabstand
  let x;
  let versuche = 0;
  const mindestabstand = 10; // in Prozentpunkten

  do {
    x = 20 + Math.random() * 30;
    versuche++;
  } while (
    letztePositionen.some(px => Math.abs(px - x) < mindestabstand) &&
    versuche < 10
  );

  // Position merken (max. 5 merken)
  letztePositionen.push(x);
  if (letztePositionen.length > 5) {
    letztePositionen.shift();
  }

  img.style.left = `${x}%`;
  img.style.width = `${größe}px`;
  img.style.height = "auto";

  container.appendChild(img);

  setTimeout(() => container.removeChild(img), 15000);
}

setInterval(erstelleKopf, 7200);

const emojis = ["💩", "🔩", "🦆", "📺", "💰", "🪼"];
const container = document.getElementById("muell-container");

function erstelleMuell() {
  const span = document.createElement("span");
  span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  span.className = "muell";

  const x = 20 + Math.random() * 30; // innerhalb der Flussbreite (0–100%)
  span.style.left = `${x}%`;
  const größe = 24 + Math.random() * 16; // verschiedene Größen

  span.style.left = `${x}%`;
  span.style.fontSize = `${größe}px`;

  // Klickfunktion (z. B. später für Links)
  //span.onclick = () => {
   // alert(`Du hast ${span.textContent} angeklickt!`);
  //};

  container.appendChild(span);

  // Entferne das Element nach 15 Sekunden
  setTimeout(() => container.removeChild(span), 15000);
}

// Alle 1–2 Sekunden neuen Müll erzeugen
setInterval(erstelleMuell, 7200);
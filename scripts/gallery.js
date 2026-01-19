// === EVENT CONFIG ===
const events = [
    {
      title: "wienstation 01/26",
      folder: "events/wienstation01",
      count: 2
    },
    {
      title: "centralgarden 11/26",
      folder: "events/centralgarden11",
      count: 1
    },
    {
      title: "seestadt10/26",
      folder: "events/seestadt",
      count: 1
    }
  ];
  
  // === ELEMENTE ===
  const grid = document.getElementById("events");
  const modal = document.getElementById("galleryModal");
  const img = document.getElementById("galleryImage");
  
  // === STATE ===
  let currentEvent = null;
  let currentIndex = 1;
  
  // === CARDS RENDERN ===
  events.forEach((event, i) => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <img src="${event.folder}/poster.jpg" loading="lazy">
    `;
    card.addEventListener("click", () => openGallery(i));
    grid.appendChild(card);
  });
  
  // === GALERIE ===
  function openGallery(i) {
    currentEvent = events[i];
    currentIndex = 1;
    updateImage();
    modal.classList.add("open");
  }
  
  function updateImage() {
    img.src = `${currentEvent.folder}/${currentIndex}.jpg`;
  }
  
  // === NAV ===
  document.getElementById("nextImg").onclick = () => {
    if (currentIndex < currentEvent.count) {
      currentIndex++;
      updateImage();
    }
  };
  
  document.getElementById("prevImg").onclick = () => {
    if (currentIndex > 1) {
      currentIndex--;
      updateImage();
    }
  };
  
  // === CLOSE ===
  document.querySelector(".close-btn").onclick = () =>
    modal.classList.remove("open");
  
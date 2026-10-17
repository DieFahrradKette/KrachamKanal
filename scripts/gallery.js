// === EVENT CONFIG ===
const events = [
    {
      title: "wienstation 01/26",
      folder: "events/wienstation01",
      count: 6
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
    },
    {
      title: "celeste 03/26",
      folder: "events/celeste",
      count: 10
    },
    {
      title: "rhiz",
      folder: "events/rhiz",
      count: 6
    },
    {
      title: "henni",
      folder: "events/henni",
      count: 0
    },
    {
      title: "zak",
      folder: "events/zak",
      count: 0
    },
    {
      title: "spitzer",
      folder: "events/spitzer",
      count: 0
    },
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

  const poster = document.createElement("img");
  poster.loading = "lazy";
  poster.alt = `Poster ${i + 1}`;

  const formats = ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"];

  function tryPosterFormat(index) {
    if (index >= formats.length) {
      console.error("Kein Poster gefunden:", event.folder);
      return;
    }

    const testImg = new Image();

    testImg.onload = () => {
      poster.src = testImg.src;
    };

    testImg.onerror = () => {
      tryPosterFormat(index + 1);
    };

    testImg.src = `${event.folder}/poster.${formats[index]}`;
  }

  tryPosterFormat(0);

  card.appendChild(poster);

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
  
  const formats = ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"];

  function updateImage() {
    const basePath = `${currentEvent.folder}/${currentIndex}`;
  
    function tryFormat(index) {
      if (index >= formats.length) {
        console.error("Kein Bild gefunden:", basePath);
        return;
      }
  
      const testImg = new Image();
  
      testImg.onload = () => {
        // Nur das erste erfolgreich geladene Bild verwenden
        img.src = testImg.src;
      };
  
      testImg.onerror = () => {
        // Nächstes Format versuchen
        tryFormat(index + 1);
      };
  
      testImg.src = `${basePath}.${formats[index]}`;
    }
  
    tryFormat(0);
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
  
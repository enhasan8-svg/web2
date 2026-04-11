function analyze() {
  const result = document.getElementById("result");
  const loadingRobot = document.getElementById("loadingRobot");
  const fileInput = document.getElementById("fileInput");

  if (!fileInput.files.length) {
    result.innerHTML = "⚠ Please upload an image first.";
    loadingRobot.style.display = "none";
    return;
  }

  result.innerHTML = "";
  loadingRobot.style.display = "block";

  setTimeout(() => {
    loadingRobot.style.display = "none";
    result.innerHTML = "✅ Real Image (87%)";
  }, 2500);
}

const robotEyes = document.getElementById("robotEyes");

function moveEyes(clientX, clientY) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const moveX = (clientX - centerX) / 35;
  const moveY = (clientY - centerY) / 35;

  robotEyes.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

document.addEventListener("mousemove", (e) => {
  moveEyes(e.clientX, e.clientY);
});

document.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  moveEyes(touch.clientX, touch.clientY);
});

document.addEventListener("mouseleave", () => {
  robotEyes.style.transform = `translate(0px, 0px)`;
});

document.addEventListener("touchend", () => {
  robotEyes.style.transform = `translate(0px, 0px)`;
});

const fileInput = document.getElementById("fileInput");
const previewImage = document.getElementById("previewImage");

fileInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };

    reader.readAsDataURL(file);
  }
});

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.innerHTML = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.innerHTML = "🌙";
    localStorage.setItem("theme", "light");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = "☀️";
  }
});

// جزئية ABOUT
const openAbout = document.getElementById("openAbout");
const aboutModal = document.getElementById("aboutModal");
const closeAbout = document.getElementById("closeAbout");
const closeAboutBtn = document.getElementById("closeAboutBtn");
const aboutCarousel = document.getElementById("aboutCarousel");
const aboutCards = document.querySelectorAll(".about-card");
const aboutPrev = document.getElementById("aboutPrev");
const aboutNext = document.getElementById("aboutNext");


let aboutAngle = 0;
let aboutRadius = 320;
let aboutDragging = false;
let startX = 0;
let currentAngle = 0;
let aboutInitialized = false;

function setupAboutCarousel() {
  if (aboutInitialized) return;

  const total = aboutCards.length;
  const step = 360 / total;

  aboutCards.forEach((card, i) => {
    const cardAngle = step * i;
    gsap.set(card, {
      rotateY: cardAngle,
      transformOrigin: `50% 50% ${-aboutRadius}px`,
      z: aboutRadius
    });
  });

  gsap.set(aboutCarousel, {
    rotateY: aboutAngle,
    transformStyle: "preserve-3d"
  });

  aboutInitialized = true;
}


openAbout.addEventListener("click", (e) => {
  e.preventDefault();
  aboutModal.classList.add("active");
  setupAboutCarousel();
});

closeAbout.addEventListener("click", () => {
  aboutModal.classList.remove("active");
});

closeAboutBtn.addEventListener("click", () => {
  aboutModal.classList.remove("active");
});

aboutCarousel.addEventListener("mousedown", (e) => {
  aboutDragging = true;
  startX = e.clientX;
  currentAngle = aboutAngle;
  aboutCarousel.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
  if (!aboutDragging) return;
  const delta = e.clientX - startX;
  aboutAngle = currentAngle + delta * 0.45;
  gsap.set(aboutCarousel, { rotateY: aboutAngle });
});

window.addEventListener("mouseup", () => {
  aboutDragging = false;
  aboutCarousel.style.cursor = "grab";
});

aboutCarousel.addEventListener("touchstart", (e) => {
  aboutDragging = true;
  startX = e.touches[0].clientX;
  currentAngle = aboutAngle;
}, { passive: true });

window.addEventListener("touchmove", (e) => {
  if (!aboutDragging) return;
  const delta = e.touches[0].clientX - startX;
  aboutAngle = currentAngle + delta * 0.45;
  gsap.set(aboutCarousel, { rotateY: aboutAngle });
}, { passive: true });

window.addEventListener("touchend", () => {
  aboutDragging = false;
});

aboutNext.addEventListener("click", () => {
  aboutAngle -= 90;
  gsap.to(aboutCarousel, {
    rotateY: aboutAngle,
    duration: 0.6,
    ease: "power2.out"
  });
});

aboutPrev.addEventListener("click", () => {
  aboutAngle += 90;
  gsap.to(aboutCarousel, {
    rotateY: aboutAngle,
    duration: 0.6,
    ease: "power2.out"
  });
});
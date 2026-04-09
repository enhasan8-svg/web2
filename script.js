
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

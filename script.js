const texts = [
  "Electrical Engineer ",
  "UI/UX Designer ",
  "Data Analyst "
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;

function type() {
  const target = document.getElementById("typewriter-text");
  if (!target) return;

  if (count === texts.length) count = 0;
  currentText = texts[count];

  if (isDeleting) {
    letter = currentText.substring(0, index--);
  } else {
    letter = currentText.substring(0, index++);
  }

  target.textContent = letter;

  if (!isDeleting && index === currentText.length) {
    isDeleting = true;
    setTimeout(type, 1200);
  } else if (isDeleting && index === 0) {
    isDeleting = false;
    count++;
    setTimeout(type, 350);
  } else {
    setTimeout(type, isDeleting ? 60 : 100);
  }
}

window.onload = () => {
  type();

  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");

  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("open");
  });
};

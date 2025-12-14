document.addEventListener("DOMContentLoaded", () => {

  /* Reveal on load */
  document.querySelectorAll(".reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), i * 120);
  });

  /* Typewriter */
  const roles = [
    "Electrical Engineer",
    "EV Enthusiast",
    "Embedded Systems Developer"
  ];

  const el = document.getElementById("typewriter");
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const text = roles[roleIndex];

    if (!deleting) {
      el.textContent = text.slice(0, ++charIndex);
      if (charIndex === text.length) {
        setTimeout(() => deleting = true, 1200);
      }
    } else {
      el.textContent = text.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 60 : 100);
  }
  typeLoop();

  /* Scroll to projects */
  document.getElementById("viewProjects")
    ?.addEventListener("click", () => {
      document.getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth" });
    });
});
/* ========================= */
/* SKILLS TAB SWITCHING */
/* ========================= */
const tabButtons = document.querySelectorAll(".tab-btn");
const skillContents = document.querySelectorAll(".skills-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    // Remove active from all buttons
    tabButtons.forEach(b => b.classList.remove("active"));

    // Hide all contents
    skillContents.forEach(c => c.classList.remove("active"));

    // Activate clicked tab
    btn.classList.add("active");

    // Show matching content
    const target = btn.dataset.tab;
    document.getElementById(target)?.classList.add("active");
  });
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      e.preventDefault();

      const headerOffset = 80; // height of fixed header
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});
document.querySelector(".nav-toggle")
  ?.addEventListener("click", () => {
    document.querySelector(".nav")?.classList.toggle("open");
  });

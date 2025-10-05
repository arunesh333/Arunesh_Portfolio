// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

  // ==================== THEME TOGGLE WITH LOCALSTORAGE ====================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  // Theme toggle functionality
  themeToggle?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });

  // ==================== HEADER SCROLL BEHAVIOR ====================
  const body = document.body;
  const scrollThreshold = 50; // Pixels to scroll before header changes

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check on page load

  // ==================== HERO TYPING ANIMATIONS ====================
  const heroNameText = document.getElementById('hero-name-text');
  const typewriterText = document.getElementById('typewriter-text');
  
  function typeEffect(element, text, initialDelay = 0, callback) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 80 + Math.random() * 50);
      } else if (callback) {
        callback();
      }
    }
    setTimeout(type, initialDelay);
  }

  typeEffect(heroNameText, 'Arunesh E', 500, () => {
    const typewriterPhrases = [
      'Electrical & Electronics Engineer ',
      'EV Systems Enthusiast ',
      'Problem Solver ',
      'Frontend Developer '
    ];
    let phraseIndex = 0;

    function typeAndErase() {
        const currentPhrase = typewriterPhrases[phraseIndex];
        let i = 0;
        let isDeleting = false;

        function loop() {
            if (isDeleting) {
                if (i > 0) {
                    typewriterText.innerHTML = currentPhrase.substring(0, i - 1);
                    i--;
                    setTimeout(loop, 40);
                } else {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
                    setTimeout(typeAndErase, 500);
                }
            } else {
                if (i < currentPhrase.length) {
                    typewriterText.innerHTML = currentPhrase.substring(0, i + 1);
                    i++;
                    setTimeout(loop, 100);
                } else {
                    setTimeout(() => { isDeleting = true; loop(); }, 2000);
                }
            }
        }
        loop();
    }
    typeAndErase();
  });


  // ==================== MOBILE NAVIGATION (HAMBURGER) ====================
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');
  const navLinks = mainNav.querySelectorAll('.nav-link');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('mobile-open');
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('mobile-open')) {
        hamburger.classList.remove('active');
        mainNav.classList.remove('mobile-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ==================== REVEAL-ON-SCROLL ANIMATION ====================
  const revealElements = document.querySelectorAll('.reveal-element');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));
  
  // ==================== ACTIVE NAV LINK ON SCROLL ====================
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.main-nav .nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            allNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
  }, { 
    rootMargin: '-50% 0px -50% 0px' 
  });

  sections.forEach(section => sectionObserver.observe(section));


  // ==================== ORBITAL NAV SMOOTH SCROLL ====================
  const orbitalBtns = document.querySelectorAll('.orbital-btn[data-target]');
  orbitalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      targetSection?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ==================== CONTACT FORM VALIDATION & SUBMISSION ====================
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors and status
    clearErrors();
    formStatus.style.display = 'none';

    // Get form data
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    // Validation
    if (name.value.trim() === '') {
      showError('name', 'Name is required.');
      isValid = false;
    }
    if (email.value.trim() === '') {
      showError('email', 'Email is required.');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError('email', 'Please enter a valid email address.');
      isValid = false;
    }
    if (message.value.trim() === '') {
      showError('message', 'Message is required.');
      isValid = false;
    }

    if (isValid) {
      // --- FAKE FORM SUBMISSION (replace with actual submission logic) ---
      console.log('Form is valid. Submitting...');
      console.log({ name: name.value, email: email.value, message: message.value });

      // Display success message
      formStatus.textContent = 'Thank you! Your message has been sent.';
      formStatus.className = 'form-status success';
      formStatus.style.display = 'block';
      form.reset();
    } else {
      // Display generic error message
      formStatus.textContent = 'Please correct the errors before submitting.';
      formStatus.className = 'form-status error';
      formStatus.style.display = 'block';
    }
  });
  
  function showError(fieldId, message) {
    const errorSpan = document.getElementById(`${fieldId}-error`);
    if (errorSpan) {
      errorSpan.textContent = message;
    }
  }

  function clearErrors() {
    const errorSpans = document.querySelectorAll('.form-error');
    errorSpans.forEach(span => span.textContent = '');
  }

  // ==================== DYNAMIC FOOTER YEAR ====================
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
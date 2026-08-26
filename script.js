/* =============================================
   PORTFOLIO JS - Soleeman Firdaus Ode
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── LOADING SCREEN ────────────────────── */
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = 'visible';
    initAnimations();
  }, 2800);

  document.body.style.overflow = 'hidden';

  /* ── NAVBAR ────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const allNavLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
    handleBackToTop();
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ── ACTIVE NAV HIGHLIGHT ──────────────── */
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const sectionTop    = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  /* ── THEME TOGGLE ──────────────────────── */
  const themeToggle = document.getElementById('themeToggle');
  const body        = document.getElementById('body');
  const iconMoon    = themeToggle.querySelector('.icon-moon');
  const iconSun     = themeToggle.querySelector('.icon-sun');

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = current === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      iconMoon.style.display = 'none';
      iconSun.style.display  = 'block';
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      iconMoon.style.display = 'block';
      iconSun.style.display  = 'none';
    }
  }

  /* ── TYPING ANIMATION ──────────────────── */
  const typingEl = document.getElementById('typingText');
  const roles = [
    'Software Developer',
    'Web Developer',
    'Database Enthusiast',
    'UI/UX Designer',
    'IT Student',
  ];
  let roleIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  let delay    = 100;

  function typeRole() {
    const current = roles[roleIdx];
    if (!deleting) {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 100;
      if (charIdx === current.length) {
        delay = 2000;
        deleting = true;
      }
    } else {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 50;
      if (charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
        delay    = 400;
      }
    }
    setTimeout(typeRole, delay);
  }

  setTimeout(typeRole, 3200);

  /* ── PARTICLES ─────────────────────────── */
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 4 + 1;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        background: ${Math.random() > 0.5 ? 'rgba(99,102,241,0.4)' : 'rgba(34,211,238,0.3)'};
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 10}s;
      `;
      container.appendChild(p);
    }
  }

  createParticles();

  /* ── SCROLL REVEAL ─────────────────────── */
  function initAnimations() {
    const revealEls = document.querySelectorAll('.reveal');
    const observer  = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 60);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ── BACK TO TOP ───────────────────────── */
  const backToTop = document.getElementById('backToTop');

  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ──────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── CONTACT FORM ──────────────────────── */
  const contactForm  = document.getElementById('contactForm');
  const nameInput    = document.getElementById('contactName');
  const emailInput   = document.getElementById('contactEmail');
  const msgInput     = document.getElementById('contactMessage');
  const nameError    = document.getElementById('nameError');
  const emailError   = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formSuccess  = document.getElementById('formSuccess');
  const submitBtn    = document.getElementById('submitBtn');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Name
    if (nameInput.value.trim().length < 2) {
      nameError.textContent = 'Nama harus minimal 2 karakter.';
      nameInput.style.borderColor = '#ef4444';
      valid = false;
    } else {
      nameError.textContent = '';
      nameInput.style.borderColor = '';
    }

    // Email
    if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Masukkan alamat email yang valid.';
      emailInput.style.borderColor = '#ef4444';
      valid = false;
    } else {
      emailError.textContent = '';
      emailInput.style.borderColor = '';
    }

    // Message
    if (msgInput.value.trim().length < 10) {
      messageError.textContent = 'Pesan harus minimal 10 karakter.';
      msgInput.style.borderColor = '#ef4444';
      valid = false;
    } else {
      messageError.textContent = '';
      msgInput.style.borderColor = '';
    }

    if (valid) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="animation: spin 1s linear infinite;">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        Sending...
      `;
      // Simulate send
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          Send Message
        `;
        formSuccess.classList.add('show');
        contactForm.reset();
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }, 1800);
    }
  });

  /* ── SKILL CARD HOVER GLOW ─────────────── */
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      this.style.boxShadow = 'var(--shadow-glow)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });

  /* ── PROJECT CARD TILT EFFECT ──────────── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (y / rect.height) * -6;
      const rotY = (x / rect.width) * 6;
      this.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  /* ── SPIN KEYFRAME FOR BUTTON ──────────── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  /* ── SERVICE CARD KEYBOARD ACCESS ─────── */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        card.classList.toggle('focused');
      }
    });
  });

  /* ── PROGRESS BAR ON SCROLL ────────────── */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(135deg, #6366f1, #22d3ee);
    z-index: 9999;
    transition: width 0.1s ease;
    border-radius: 0 2px 2px 0;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop  = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress   = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });

  /* ── TOAST NOTIFICATION HANDLER ────────── */
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.id = 'portfolioToast';
  toast.innerHTML = `
    <span class="toast-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    </span>
    <span class="toast-msg"></span>
  `;
  document.body.appendChild(toast);

  let toastTimeout;
  function showToast(message) {
    const toastMsg = toast.querySelector('.toast-msg');
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // Handle Download CV click
  const cvBtn = document.querySelector('a[download]');
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      if (cvBtn.getAttribute('href') === '#' || !cvBtn.getAttribute('href')) {
        e.preventDefault();
        showToast('CV akan segera tersedia! Hubungi saya di pandueman7@gmail.com.');
      }
    });
  }

  // Handle Disabled Buttons
  document.querySelectorAll('.project-btn.disabled').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Link project atau demo ini belum dipublikasikan.');
    });
  });

});

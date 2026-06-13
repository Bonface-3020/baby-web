/* =====================================================
   SUNSHINE TOTS DAYCARE - MAIN JAVASCRIPT
   ===================================================== */

'use strict';

// ── PRELOADER ───────────────────────────────────
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Lock body scroll while preloader is visible
  document.body.style.overflow = 'hidden';

  function hidePreloader() {
    // Cancel the CSS fallback animation so it doesn't fight with JS
    preloader.style.animation = 'none';
    // Fade out
    preloader.style.opacity = '0';
    preloader.style.pointerEvents = 'none';

    // After transition completes, remove from flow entirely
    setTimeout(function () {
      preloader.style.display = 'none';
      // Restore body scroll
      document.body.style.overflow = '';
    }, 500); // matches transition: opacity 0.5s ease
  }

  window.addEventListener('load', function () {
    // Small delay so the spinner is visible for at least a moment
    setTimeout(hidePreloader, 800);
  });

  // Hard failsafe: hide after 5s no matter what
  setTimeout(hidePreloader, 5000);
})();

// ── NAVBAR SCROLL EFFECT ──────────────────────────
const navbar = document.querySelector('.navbar-custom');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.padding = '6px 0';
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
    } else {
      navbar.style.padding = '12px 0';
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    }
  });
}

// ── BACK TO TOP BUTTON ────────────────────────────
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── ACTIVE NAV LINK ───────────────────────────────
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link-custom').forEach(link => {
  const href = link.getAttribute('href');
  if (href && (currentPath === href || (href !== '/' && currentPath.startsWith(href)))) {
    link.classList.add('active');
  }
  if (currentPath === '/' && href === '/') {
    link.classList.add('active');
  }
});

// ── ANIMATED COUNTER ──────────────────────────────
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter-number').forEach(el => {
  counterObserver.observe(el);
});

// ── AOS - ANIMATE ON SCROLL (Manual Implementation) ──
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.aosDelay || 0;
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translate(0, 0) scale(1)';
        }, parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    const animation = el.dataset.aos;
    el.style.transition = `opacity 0.7s ease, transform 0.7s ease`;
    el.style.opacity = '0';

    switch (animation) {
      case 'fade-up':
        el.style.transform = 'translateY(40px)';
        break;
      case 'fade-down':
        el.style.transform = 'translateY(-40px)';
        break;
      case 'fade-left':
        el.style.transform = 'translateX(-40px)';
        break;
      case 'fade-right':
        el.style.transform = 'translateX(40px)';
        break;
      case 'zoom-in':
        el.style.transform = 'scale(0.8)';
        break;
      case 'fade-in':
      default:
        el.style.transform = 'translateY(0)';
    }

    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', initAOS);

// ── GALLERY LIGHTBOX ──────────────────────────────
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  // Create modal
  const modal = document.createElement('div');
  modal.id = 'lightbox-modal';
  modal.style.display = 'none'; // hidden until a gallery item is clicked
  modal.innerHTML = `
    <div class="lightbox-overlay" id="lightbox-overlay">
      <div class="lightbox-content">
        <button class="lightbox-close" id="lightbox-close">&times;</button>
        <img id="lightbox-img" src="" alt="Gallery Image">
        <p class="lightbox-caption" id="lightbox-caption"></p>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .lightbox-overlay {
      position: fixed; top:0; left:0; width:100%; height:100%;
      background: rgba(0,0,0,0.92); z-index: 99999;
      display: flex; align-items: center; justify-content: center;
      padding: 20px; animation: fadeInOverlay 0.3s ease;
    }
    @keyframes fadeInOverlay { from { opacity:0; } to { opacity:1; } }
    .lightbox-content { position: relative; max-width: 900px; width: 100%; text-align: center; }
    .lightbox-content img { max-width:100%; max-height:80vh; border-radius:16px; object-fit:contain; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
    .lightbox-close {
      position: absolute; top:-50px; right:0;
      background: #f06292; color: white; border: none;
      border-radius: 50%; width:40px; height:40px;
      font-size:1.5rem; cursor:pointer; transition: all 0.3s ease;
      display: flex; align-items: center; justify-content: center;
    }
    .lightbox-close:hover { transform: rotate(90deg); background: #e91e8c; }
    .lightbox-caption { color: rgba(255,255,255,0.8); margin-top:15px; font-size:0.95rem; font-weight:600; }
  `;

  document.head.appendChild(style);
  document.body.appendChild(modal);

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-overlay-text');
      document.getElementById('lightbox-img').src = img.src;
      document.getElementById('lightbox-caption').textContent = caption ? caption.textContent : '';
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-overlay')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightbox-overlay')) closeLightbox();
  });

  function closeLightbox() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

document.addEventListener('DOMContentLoaded', initLightbox);

// ── CONTACT FORM VALIDATION ───────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    let isValid = true;
    const required = contactForm.querySelectorAll('[required]');
    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#e91e8c';
        field.style.background = '#fff0f5';
        isValid = false;
        field.addEventListener('input', () => {
          field.style.borderColor = '';
          field.style.background = '';
        }, { once: true });
      }
    });

    // Email validation
    const emailField = contactForm.querySelector('#email');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.style.borderColor = '#e91e8c';
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      // Shake animation on invalid
      contactForm.style.animation = 'shake 0.4s ease';
      setTimeout(() => { contactForm.style.animation = ''; }, 400);
    } else {
      // Show loading state
      const submitBtn = contactForm.querySelector('.btn-submit-custom');
      if (submitBtn) {
        submitBtn.textContent = '📤 Sending...';
        submitBtn.disabled = true;
      }
    }
  });

  // Add shake keyframes
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25%       { transform: translateX(-10px); }
      75%       { transform: translateX(10px); }
    }
  `;
  document.head.appendChild(shakeStyle);
}

// ── TESTIMONIAL CAROUSEL DRAG ─────────────────────
(function() {
  const carousel = document.getElementById('testimonialCarousel');
  if (!carousel) return;

  let startX = 0;
  let isDragging = false;

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    const bsCarousel = bootstrap.Carousel.getInstance(carousel);
    if (diff > 50) bsCarousel?.next();
    else if (diff < -50) bsCarousel?.prev();
    isDragging = false;
  }, { passive: true });
})();

// ── RIPPLE EFFECT ON BUTTONS ──────────────────────
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-primary-custom, .btn-secondary-custom, .btn-submit-custom, .btn-enroll-nav');
  if (!btn) return;

  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position:absolute; width:${size}px; height:${size}px;
    border-radius:50%; background:rgba(255,255,255,0.4);
    top:${y}px; left:${x}px; transform:scale(0);
    animation:rippleEffect 0.6s ease; pointer-events:none; z-index:10;
  `;

  if (getComputedStyle(btn).position === 'static') {
    btn.style.position = 'relative';
  }
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleEffect {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

// ── PARTICLE EMOJIS ON HOVER ──────────────────────
function createParticle(x, y) {
  const emojis = ['⭐', '💫', '🌟', '✨', '🎈', '💖', '🌸', '🦋'];
  const el = document.createElement('div');
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.cssText = `
    position:fixed; left:${x}px; top:${y}px;
    font-size:${Math.random() * 10 + 12}px;
    pointer-events:none; z-index:99999;
    animation:particleFly 1s ease forwards;
    transform-origin:center;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes particleFly {
    0%   { opacity:1; transform: translate(0,0) scale(1) rotate(0deg); }
    100% { opacity:0; transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 80 + 20}px, -${Math.random() * 100 + 50}px) scale(0) rotate(${Math.random() * 360}deg); }
  }
`;
document.head.appendChild(particleStyle);

document.querySelectorAll('.btn-primary-custom, .btn-enroll-nav').forEach(btn => {
  btn.addEventListener('click', (e) => {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        createParticle(
          e.clientX + (Math.random() - 0.5) * 40,
          e.clientY + (Math.random() - 0.5) * 40
        );
      }, i * 80);
    }
  });
});

// ── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── EMOJI STRIP DUPLICATION ───────────────────────
const emojiTrack = document.querySelector('.emoji-track');
if (emojiTrack) {
  emojiTrack.innerHTML += emojiTrack.innerHTML;
}

// ── TYPING EFFECT FOR HERO ─────────────────────────
function typeEffect(el, text, speed = 60) {
  let i = 0;
  el.textContent = '';
  const timer = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

const typingEl = document.querySelector('.hero-typing');
if (typingEl) {
  const phrases = ['Safe & Loving Care', 'Fun Learning Activities', 'Healthy Meals Daily', 'Expert Caregivers'];
  let phraseIndex = 0;

  function cyclePhrase() {
    typeEffect(typingEl, phrases[phraseIndex]);
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(cyclePhrase, 3500);
  }

  setTimeout(cyclePhrase, 1500);
}

console.log('%c🌟 Sunshine Tots Daycare | Bamburi, Mombasa, Kenya 🌟', 'font-size:16px; color:#e91e8c; font-weight:bold;');

/**
 * FORCEINDIA TRAILERS — ULTRA-MODERN B2B INTERACTION ENGINE
 * Hardware-accelerated cursor, tactile button physics, 3D card parallax,
 * and seamless scroll telemetry.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initButtonInteractions();
  initCardTiltPhysics();
  initReadingProgressBar();
  initHeaderScrollShadow();
  initIntersectionObserverReveals();
  initAnimatedCounters();
  initModalEngine();
  initMobileDrawer();
});

/* ── 1. HARDWARE-ACCELERATED CUSTOM CURSOR ── */
function initCustomCursor() {
  // Only enable on desktop with fine mouse pointer
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let dot = document.getElementById('cursor-dot');
  let ring = document.getElementById('cursor-ring');

  if (!dot || !ring) {
    dot = document.createElement('div');
    dot.id = 'cursor-dot';
    ring = document.createElement('div');
    ring.id = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
  }

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let isHovering = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  }, { passive: true });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Interactive Target Hovers
  const hoverTargets = 'a, button, .btn-cta, .oq, input, select, textarea, .prod-card, .card-hover, .swatch-btn, .chassis-tab-btn, .trust-item';
  
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverTargets);
    if (target) {
      document.body.classList.add('cursor-hover');
      if (target.classList.contains('btn-cta-cyan') || target.closest('.cyan-hover') || target.closest('#hero-skeletal')) {
        document.body.classList.add('cursor-hover-cyan');
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(hoverTargets);
    if (target) {
      document.body.classList.remove('cursor-hover', 'cursor-hover-cyan');
    }
  });
}

/* ── 2. TACTILE BUTTON INTERACTIONS ── */
function initButtonInteractions() {
  const buttons = document.querySelectorAll('.btn-cta, .oq, .btn-cyn, .btn-acc');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--btn-mouse-x', `${x}px`);
      btn.style.setProperty('--btn-mouse-y', `${y}px`);
    });
  });
}

/* ── 3. CARD 3D INTERACTIVE PARALLAX TILT ── */
function initCardTiltPhysics() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const tiltCards = document.querySelectorAll('.prod-card, .card-hover, .card-spec-lux, .hud-box');

  tiltCards.forEach(card => {
    let bounds;

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const halfW = bounds.width / 2;
      const halfH = bounds.height / 2;

      const rotX = -((mouseY - halfH) / halfH) * 5; // max 5deg tilt
      const rotY = ((mouseX - halfW) / halfW) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    }

    function onMouseLeave() {
      card.style.transform = '';
      bounds = null;
    }

    card.addEventListener('mouseenter', onMouseEnter, { passive: true });
    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave, { passive: true });
  });
}

/* ── 4. READING PROGRESS BAR ── */
function initReadingProgressBar() {
  const ppb = document.getElementById('ppb');
  if (!ppb) return;

  window.addEventListener('scroll', () => {
    const s = document.documentElement.scrollTop || document.body.scrollTop;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (h > 0) ppb.style.width = (s / h * 100) + '%';
  }, { passive: true });
}

/* ── 5. HEADER SCROLL SHADOW ── */
function initHeaderScrollShadow() {
  const hdr = document.getElementById('hdr');
  if (!hdr) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) hdr.classList.add('scrolled');
    else hdr.classList.remove('scrolled');
  }, { passive: true });
}

/* ── 6. INTERSECTION OBSERVER REVEALS ── */
function initIntersectionObserverReveals() {
  const revealElements = document.querySelectorAll('.rv, .rv-left, .rv-right');
  if (!revealElements.length || typeof gsap === 'undefined') return;

  const rvIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        gsap.to(e.target, { opacity: 1, y: 0, x: 0, duration: 0.65, ease: 'power2.out' });
        rvIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => rvIO.observe(el));
}

/* ── 7. ANIMATED STAT COUNTERS ── */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('.cu');
  if (!counterElements.length) return;

  const cntIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.t);
        if (isNaN(target)) return;
        
        let current = 0;
        const step = Math.ceil(target / 45);
        const timer = setInterval(() => {
          current = Math.min(target, current + step);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 25);
        cntIO.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => cntIO.observe(el));
}

/* ── 8. MASTER RFQ MODAL ENGINE ── */
function initModalEngine() {
  const qmod = document.getElementById('qmod');
  const rp = document.getElementById('rp');
  if (!qmod) return;

  document.querySelectorAll('.oq').forEach(b => {
    b.addEventListener('click', () => {
      if (b.dataset.p && rp) rp.value = b.dataset.p;
      qmod.classList.add('op');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    qmod.classList.remove('op');
    document.body.style.overflow = '';
  };

  document.getElementById('cmod')?.addEventListener('click', closeModal);
  qmod.addEventListener('click', (e) => { if (e.target === qmod) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  const rfqForm = document.getElementById('rfq');
  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = rfqForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Generating Dispatch Confirmation...';
        
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-check-circle mr-2 text-emerald-400"></i> Quote Request Logged Successfully!';
          setTimeout(() => {
            closeModal();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            rfqForm.reset();
          }, 1500);
        }, 900);
      }
    });
  }
}

/* ── 9. MOBILE MENU DRAWER ── */
function initMobileDrawer() {
  const mobMenu = document.getElementById('mobile-menu');
  const openBtn = document.getElementById('mob-open-btn');
  const closeBtn = document.getElementById('mob-close-btn');

  if (!mobMenu) return;

  openBtn?.addEventListener('click', () => {
    mobMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  closeBtn?.addEventListener('click', () => {
    mobMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
}

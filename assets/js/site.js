/* ==========================================================================
   FORCEINDIA TRAILERS — SITE ENGINE v3
   Shared header / menu / footer / modal injection, smooth scroll (Lenis),
   page transitions, GSAP reveals, canvas frame-sequence 3D scrubbing,
   and all product configurators. One file powers every page.
   ========================================================================== */
(() => {
  'use strict';

  const PHONE = '+91 98765 43210';
  const TEL = 'tel:+919876543210';
  const page = document.body.dataset.page || 'home';
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ────────────────────────────────────────────────────────────
     1. SHARED CHROME (identical on every page)
     ──────────────────────────────────────────────────────────── */
  const NAV = [
    { id: 'home', href: 'index.html?v=5', label: 'Home' },
    { id: 'flatbed', href: 'flatbed.html?v=5', label: 'Flatbed' },
    { id: 'skeletal', href: 'skeletal.html?v=5', label: 'Skeletal' },
    { id: 'custom', href: 'customized.html?v=5', label: 'Custom Builds' },
    { id: 'lab', href: 'index.html?v=5#lab', label: '3D Lab' },
  ];
  const navLinks = NAV.map((n, i) => `<a href="${n.href}" class="${n.id === page ? 'active' : ''}"><em>0${i + 1}</em>${n.label}</a>`).join('');
  const logo = `
    <a href="index.html?v=5" class="logo" aria-label="ForceIndia Trailers home">
      <span class="logo-mark" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 6h14l-2 3.5H7.5L6.5 11.5h9l-1.8 3.2H5L3 19" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"/>
          <path d="M16.5 6H21l-4.5 13H12l4.5-13Z" fill="currentColor"/>
        </svg>
      </span>
      <span class="logo-text">
        <span class="logo-word">FORCE<b>INDIA</b></span>
        <small>HEAVY TRAILERS · EST. 1990</small>
      </span>
    </a>`;

  const chrome = `
  <div class="wipe" id="wipe"><div class="wipe-logo">FORCE<b>INDIA</b></div><div class="wipe-bar"><i></i></div></div>
  <header class="hdr" id="hdr">
    <div class="topbar"><div class="topbar-in">
      <div><span><i class="dot"></i><b>Factory Open</b> · Dispatching Pan-India</span><i class="sep"></i><span>ARAI · AIS-093 Homologated</span><i class="sep"></i><span><b>14,000+</b> Active Highway Chassis</span></div>
      <div><a href="SAMPLE FLATBED PAGE 1.pdf" download>↓ Spec Dossier (PDF)</a><i class="sep"></i><a href="mailto:sales@forceindiatrailers.com">sales@forceindiatrailers.com</a></div>
    </div></div>
    <div class="hdr-main"><div class="hdr-in">
      ${logo}
      <nav class="nav" aria-label="Primary">${navLinks}</nav>
      <div class="hdr-cta">
        <a href="${TEL}" class="hdr-phone" data-magnetic>
          <span class="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg></span>
          <span><small>Sales Desk</small><strong>${PHONE}</strong></span>
        </a>
        <button class="btn btn-primary btn-sm" data-quote data-magnetic>Get a Quote <span class="arr"></span></button>
        <button class="burger" id="burger" aria-label="Open menu"><span></span><span></span></button>
      </div>
    </div></div>
  </header>
  <div class="menu" id="menu" aria-hidden="true">
    <nav>${NAV.map((n, i) => `<a href="${n.href}" class="${n.id === page ? 'active' : ''}"><span>0${i + 1}</span>${n.label}</a>`).join('')}</nav>
    <div class="menu-foot">
      <button class="btn btn-primary btn-block" data-quote>Request Factory Quote <span class="arr"></span></button>
      <a href="${TEL}" class="btn btn-line btn-block">Call ${PHONE}</a>
      <a href="https://wa.me/919876543210" target="_blank" rel="noopener" class="btn btn-line btn-block" style="color:#22c55e;border-color:rgba(34,197,94,.4)">WhatsApp Chat</a>
    </div>
  </div>
  <div class="dock" id="dock">
    <a href="${TEL}" class="btn btn-dark" aria-label="Call Sales Desk"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:4px"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>Call</a>
    <a href="https://wa.me/919876543210" target="_blank" rel="noopener" class="btn btn-dark" style="color:#22c55e" aria-label="Chat on WhatsApp">WhatsApp</a>
    <button class="btn btn-primary" data-quote aria-label="Get Quote">Get Quote</button>
  </div>
  <div class="cur"></div><div class="cur-ring"><span></span></div>`;

  const footer = `
  <footer class="foot" id="contact">
    <div class="wrap">
      <div class="foot-top">
        <div>
          <span class="eyebrow">Direct Factory Engineering · 4-Hour Quote SLA</span>
          <h3 class="h2">Ready to build your<br><span class="grad">next heavy-haul fleet?</span></h3>
          <div class="foot-certs">
            <span class="pill y">ARAI · AIS-093 Certified</span>
            <span class="pill">ST-52 / E350 Steel</span>
            <span class="pill">WABCO EBS-E + JOST OEM</span>
            <span class="pill">10-Yr Structural Warranty</span>
          </div>
        </div>
        <div class="btn-row">
          <button class="btn btn-primary btn-lg" data-quote>Configure Factory Quote <span class="arr"></span></button>
          <a href="SAMPLE FLATBED PAGE 1.pdf" download class="btn btn-dark btn-lg">Download Spec PDF</a>
        </div>
      </div>
      <div class="foot-grid">
        <div class="foot-col">
          ${logo}
          <p>India’s premier heavy-duty flatbed, skeletal container chassis, and bespoke ODC trailer manufacturer. Robotic submerged-arc welded in ST-52 steel, homologated to AIS-093, proven across 14,000+ active highway units.</p>
          <div class="foot-certs mt-s">
            <span class="pill y">ISO 9001:2015</span>
            <span class="pill b">Form-22A Ready</span>
          </div>
        </div>
        <div class="foot-col">
          <h5><span>01 /</span> Trailer Platforms</h5>
          <ul>
            <li><a href="flatbed.html?v=4">Flatbed Trailers (40–80 ft)</a></li>
            <li><a href="skeletal.html?v=4">Skeletal Chassis (20–45 ft)</a></li>
            <li><a href="customized.html?v=4">Telescopic &amp; ODC Builds</a></li>
            <li><a href="customized.html?v=4#livery">Custom OEM Fleet Liveries</a></li>
            <li><a href="index.html?v=4#lab">3D Engineering Telemetry Lab</a></li>
          </ul>
        </div>
        <div class="foot-col">
          <h5><span>02 /</span> Interactive Tools</h5>
          <ul>
            <li><a href="flatbed.html?v=4#breakdown">6-Zone Component Breakdown</a></li>
            <li><a href="flatbed.html?v=4#configurator">CAD Deck-Length Visualizer</a></li>
            <li><a href="flatbed.html?v=4#calc">Payload &amp; Axle Calculator</a></li>
            <li><a href="skeletal.html?v=4#containerViz">Container Drop Simulator</a></li>
            <li><a href="SAMPLE FLATBED PAGE 1.pdf" download>Official Spec Dossier (PDF)</a></li>
          </ul>
        </div>
        <div class="foot-col">
          <h5><span>03 /</span> Direct Factory Desk</h5>
          <a href="${TEL}" class="foot-contact-card">
            <small>24×7 Fleet Sales &amp; RFQ Line</small>
            <strong>${PHONE}</strong>
          </a>
          <a href="mailto:sales@forceindiatrailers.com" class="foot-contact-card">
            <small>Engineering &amp; CAD Desk</small>
            <strong style="font-size:19px">sales@forceindiatrailers.com</strong>
          </a>
          <div class="label mt-s">Mon–Sat · 09:00–19:00 IST · Pan-India Dispatch</div>
        </div>
      </div>
    </div>
    <div class="foot-word" aria-hidden="true">FORCE<b>INDIA</b></div>
    <div class="foot-bot">
      <div class="wrap" style="display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap">
        <span>© 2026 ForceIndia Trailers Pvt. Ltd. · All Rights Reserved</span>
        <span>ARAI · AIS-093 Homologated · Built in India</span>
        <a href="#" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;" style="color:var(--y)">Back to Top ↑</a>
      </div>
    </div>
  </footer>
  <div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle">
    <div class="modal-bg" data-close></div>
    <div class="modal-box" data-lenis-prevent>
      <button class="modal-x" data-close aria-label="Close">×</button>
      <span class="eyebrow">4-hour response SLA</span>
      <h3 class="h2" id="mTitle">Get your <span class="y">factory quote</span></h3>
      <p class="lead">Tell us what you haul. A trailer engineer replies with pricing, drawings and delivery slots.</p>
      <form class="form" data-form>
        <div class="field"><input id="mProduct" name="product" placeholder=" " readonly><label for="mProduct">Product</label></div>
        <div class="row">
          <div class="field"><input id="mName" required placeholder=" "><label for="mName">Your name</label></div>
          <div class="field"><input id="mCo" required placeholder=" "><label for="mCo">Company</label></div>
        </div>
        <div class="row">
          <div class="field"><input id="mPhone" type="tel" required placeholder=" "><label for="mPhone">Phone</label></div>
          <div class="field"><select id="mQty"><option>1–5 units</option><option>6–20 units</option><option>21–50 units</option><option>50+ units (fleet)</option></select><label for="mQty">Quantity</label></div>
        </div>
        <div class="field"><textarea id="mMsg" placeholder=" "></textarea><label for="mMsg">Cargo, route &amp; requirements</label></div>
        <button class="btn btn-primary btn-lg btn-block" type="submit">Send Request <span class="arr"></span></button>
        <div class="form-note"><span>No spam</span><span>Direct from factory</span><span>Pan-India delivery</span></div>
      </form>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('afterbegin', chrome);
  document.body.insertAdjacentHTML('beforeend', footer);

  /* ────────────────────────────────────────────────────────────
     2. SMOOTH SCROLL
     ──────────────────────────────────────────────────────────── */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    if (hasGSAP && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  const scrollTo = (target, opts = {}) => {
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4, ...opts });
    else {
      const y = typeof target === 'number' ? target : target.getBoundingClientRect().top + scrollY;
      scrollTo === null; window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  /* ────────────────────────────────────────────────────────────
     3. PAGE TRANSITIONS
     ──────────────────────────────────────────────────────────── */
  const wipe = $('#wipe');
  if (wipe) wipe.style.display = 'none';
  function playEnter() {
    if (wipe) wipe.style.display = 'none';
    document.dispatchEvent(new Event('site:ready'));
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || a.target || a.hasAttribute('download') || e.metaKey || e.ctrlKey) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    const samePage = url.pathname === location.pathname;
    if (url.hash && (samePage || a.getAttribute('href').startsWith('#'))) {
      const t = document.getElementById(url.hash.slice(1));
      if (t) { e.preventDefault(); closeMenu(); scrollTo(t); }
      return;
    }
    closeMenu();
  });

  /* ────────────────────────────────────────────────────────────
     4. HEADER, MENU, DOCK
     ──────────────────────────────────────────────────────────── */
  const hdr = $('#hdr'), dock = $('#dock');
  let lastY = 0;
  function onScroll() {
    const y = scrollY;
    hdr.classList.toggle('solid', y > 30);
    if (!document.body.classList.contains('menu-open')) hdr.classList.toggle('hide', y > 500 && y > lastY + 4);
    if (y < lastY - 4) hdr.classList.remove('hide');
    dock && dock.classList.toggle('show', y > 600);
    lastY = y;
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    document.body.classList.remove('menu-open');
    $('#menu').setAttribute('aria-hidden', 'true');
    lenis && lenis.start();
  }
  $('#burger').addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    $('#menu').setAttribute('aria-hidden', String(!open));
    hdr.classList.remove('hide');
    open ? lenis && lenis.stop() : lenis && lenis.start();
  });

  /* ────────────────────────────────────────────────────────────
     5. QUOTE MODAL + FORMS
     ──────────────────────────────────────────────────────────── */
  const productNames = { home: 'ForceIndia Trailer Range', flatbed: 'Flatbed Trailer (40–80 ft)', skeletal: 'Skeletal Container Chassis', custom: 'Custom / ODC Trailer' };
  function openModal(product) {
    $('#mProduct').value = product || productNames[page];
    document.body.classList.add('modal-open');
    closeMenu();
    lenis && lenis.stop();
    setTimeout(() => $('#mName').focus({ preventScroll: true }), 400);
  }
  function closeModal() { document.body.classList.remove('modal-open'); lenis && lenis.start(); }
  document.addEventListener('click', e => {
    const q = e.target.closest('[data-quote]');
    if (q) { e.preventDefault(); openModal(q.dataset.quote); }
    if (e.target.closest('[data-close]')) closeModal();
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeMenu(); } });

  $$('[data-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const b = f.querySelector('[type=submit]');
    const html = b.innerHTML;
    b.disabled = true; b.innerHTML = 'Sending…';
    setTimeout(() => {
      b.innerHTML = '✓ Received — we’ll call you shortly';
      setTimeout(() => { b.disabled = false; b.innerHTML = html; f.reset(); if (f.closest('.modal')) closeModal(); }, 2200);
    }, 900);
  }));

  /* ────────────────────────────────────────────────────────────
     6. CURSOR, MAGNETIC, SPOTLIGHT
     ──────────────────────────────────────────────────────────── */
  if (fine) {
    const dot = $('.cur'), ring = $('.cur-ring'), ringTxt = ring.querySelector('span');
    let mx = -100, my = -100, rx = -100, ry = -100;
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; }, { passive: true });
    (function loop() { rx += (mx - rx) * .16; ry += (my - ry) * .16; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); })();
    document.addEventListener('mouseover', e => {
      const l = e.target.closest('[data-cursor]');
      const h = e.target.closest('a, button, input, select, textarea, .card, .sw, .tab');
      document.body.classList.toggle('c-label', !!l);
      document.body.classList.toggle('c-hover', !!h && !l);
      if (l) ringTxt.textContent = l.dataset.cursor;
    });

    $$('[data-magnetic], .btn-lg').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * .22, y = (e.clientY - r.top - r.height / 2) * .3;
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('mouseleave', () => {
        if (hasGSAP) gsap.to(el, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.4)', clearProps: 'transform' });
        else el.style.transform = '';
      });
    });

    document.addEventListener('mousemove', e => {
      const c = e.target.closest('.card');
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`);
      c.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  /* ────────────────────────────────────────────────────────────
     7. TEXT SPLITTING + SCROLL ANIMATIONS
     ──────────────────────────────────────────────────────────── */
  function splitWords(el) {
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const i = document.createElement('span'); i.className = 'wi'; i.textContent = part;
            w.appendChild(i); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
    return $$('.wi', el);
  }
  const splits = $$('[data-split]').map(el => ({ el, words: splitWords(el) }));

  if (hasGSAP && window.ScrollTrigger && !reduce) {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth <= 900 || !fine;
    const introSplits = splits.filter(s => s.el.dataset.split === 'intro');

    if (!isMobile) {
      introSplits.forEach(s => gsap.set(s.words, { yPercent: 115 }));
      gsap.set('[data-intro]', { y: 30, opacity: 0 });
      gsap.set('.trailer-stage img, [data-intro-img]', { x: '20vw', opacity: 0 });

      document.addEventListener('site:ready', () => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        introSplits.forEach((s, i) => tl.to(s.words, { yPercent: 0, duration: 1.1, stagger: .05 }, i * .1));
        tl.to('.trailer-stage img, [data-intro-img]', { x: 0, opacity: 1, duration: 1.4, ease: 'power4.out' }, .1)
          .to('[data-intro]', { y: 0, opacity: 1, duration: 0.9, stagger: .08 }, .3)
          .from('.hero-stats .stat', { y: 20, opacity: 0, duration: 0.8, stagger: .06 }, .5);
      }, { once: true });
    } else {
      introSplits.forEach(s => gsap.set(s.words, { yPercent: 0, opacity: 1 }));
      gsap.set('[data-intro]', { y: 0, opacity: 1 });
      gsap.set('.trailer-stage img, [data-intro-img]', { x: 0, opacity: 1 });
    }

    // Scroll-triggered split headings
    splits.filter(s => s.el.dataset.split !== 'intro').forEach(s => {
      gsap.from(s.words, { yPercent: 115, duration: 1.2, stagger: .05, ease: 'expo.out', scrollTrigger: { trigger: s.el, start: 'top 85%' } });
    });

    // Generic reveal
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      onEnter: els => gsap.fromTo(els, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: .1, ease: 'expo.out', overwrite: true }),
    });
    gsap.set('[data-reveal]', { opacity: 0 });

    // Image clip reveal
    $$('[data-clip]').forEach(el => {
      const img = el.querySelector('img, video');
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%' } });
      tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' });
      if (img) tl.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0);
    });

    // Parallax
    $$('[data-speed]').forEach(el => {
      gsap.to(el, { yPercent: -parseFloat(el.dataset.speed) * 20, ease: 'none', scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // Hero trailer drifts away on scroll
    const ts = $('.trailer-stage');
    if (ts) gsap.to(ts, { xPercent: 12, yPercent: -8, scale: 1.06, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    const hw = $('.hero-word');
    if (hw) gsap.to(hw, { xPercent: -15, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // Timeline progress line
    const tline = $('.timeline-line i');
    if (tline) {
      const vertical = innerWidth <= 1100;
      gsap.to(tline, { [vertical ? 'scaleY' : 'scaleX']: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 75%', end: 'bottom 60%', scrub: true } });
      gsap.from('.step', { y: 40, opacity: 0, stagger: .12, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.timeline', start: 'top 75%' } });
    }

    // Counters
    $$('[data-count]').forEach(el => {
      const end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), o = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => gsap.to(o, { v: end, duration: 2, ease: 'power3.out', onUpdate: () => { el.textContent = o.v.toFixed(dec); } }) });
    });

    // Horizontal product gallery (desktop pin; mobile = native swipe)
    const hs = $('.hscroll');
    if (hs && innerWidth > 1100) {
      const track = $('.hscroll-track', hs);
      const dist = () => track.scrollWidth - innerWidth;
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: hs, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true,
          onUpdate: self => { const p = $('.hscroll-progress i', hs); if (p) p.style.transform = `scaleX(${self.progress})`; },
        },
      });
    }

    addEventListener('load', () => ScrollTrigger.refresh());
  } else {
    $$('[data-count]').forEach(el => { el.textContent = el.dataset.count; });
  }

  /* ────────────────────────────────────────────────────────────
     8. CANVAS FRAME-SEQUENCE SCRUB (silky 3D assembly)
     Decodes the MP4 into bitmaps once, then draws frames on scroll
     with inertia — no more stuttering video seeks.
     ──────────────────────────────────────────────────────────── */
  class FrameScrub {
    constructor(sec) {
      if (innerWidth <= 900) return;
      this.sec = sec;
      this.canvas = $('canvas', sec);
      this.ctx = this.canvas.getContext('2d');
      this.stages = $$('.stage', sec);
      this.steps = $$('.scrub-steps li', sec);
      this.bar = $('.scrub-bar i', sec);
      this.pct = $('[data-pct]', sec);
      this.hint = $('.scrub-hint', sec);
      const mobile = innerWidth < 768;
      this.N = mobile ? 50 : 84;
      this.W = mobile ? 720 : 1120;
      this.frames = new Array(this.N);
      this.cur = 0; this.last = -1; this.active = -1; this.dirty = true;
      this.resize();
      addEventListener('resize', () => this.resize());
      this.steps.forEach((li, i) => li.addEventListener('click', () => {
        const top = sec.getBoundingClientRect().top + scrollY;
        const total = sec.offsetHeight - innerHeight;
        scrollTo(top + total * ((i + .5) / this.stages.length), { duration: 1.8 });
      }));
      new IntersectionObserver((en, ob) => { if (en[0].isIntersecting) { ob.disconnect(); this.load(); } }, { rootMargin: '150% 0px' }).observe(sec);
      this.tick = this.tick.bind(this);
      requestAnimationFrame(this.tick);
    }
    resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      this.canvas.width = this.canvas.clientWidth * dpr;
      this.canvas.height = this.canvas.clientHeight * dpr;
      this.dirty = true;
    }
    seek(v, t) {
      return new Promise(res => {
        let done = false;
        const fin = () => { if (!done) { done = true; res(); } };
        v.addEventListener('seeked', fin, { once: true });
        setTimeout(fin, 1200);
        v.currentTime = t;
      });
    }
    async load() {
      const v = document.createElement('video');
      v.muted = true; v.playsInline = true; v.preload = 'auto'; v.src = this.sec.dataset.video;
      await new Promise(res => {
        if (v.readyState >= 2) return res();
        v.addEventListener('loadeddata', res, { once: true });
        setTimeout(() => { v.play().then(() => v.pause()).catch(() => {}); }, 2500);
        setTimeout(res, 6000);
      });
      if (!v.videoWidth) { this.sec.classList.add('ready'); return; }
      const d = v.duration || 8;
      const h = Math.round(this.W * v.videoHeight / v.videoWidth);
      const off = document.createElement('canvas'); off.width = this.W; off.height = h;
      const oc = off.getContext('2d');
      // coarse-to-fine order so the full range is scrubbable within ~1s
      const order = [this.N - 1], seen = new Set(order);
      [16, 8, 4, 2, 1].forEach(s => { for (let i = 0; i < this.N; i += s) if (!seen.has(i)) { seen.add(i); order.push(i); } });
      for (const i of order) {
        await this.seek(v, Math.min(d - .04, (i / (this.N - 1)) * d));
        oc.drawImage(v, 0, 0, this.W, h);
        try { this.frames[i] = await createImageBitmap(off); }
        catch { const c = document.createElement('canvas'); c.width = this.W; c.height = h; c.getContext('2d').drawImage(off, 0, 0); this.frames[i] = c; }
        if (i === 0 || this.frames.filter(Boolean).length > 4) this.sec.classList.add('ready');
        this.dirty = true;
      }
      v.removeAttribute('src'); v.load();
    }
    frame(i) {
      if (this.frames[i]) return this.frames[i];
      for (let k = 1; k < this.N; k++) {
        if (this.frames[i - k]) return this.frames[i - k];
        if (this.frames[i + k]) return this.frames[i + k];
      }
    }
    draw(img) {
      const cw = this.canvas.width, ch = this.canvas.height;
      const iw = img.width, ih = img.height;
      const s = Math.max(cw / iw, ch / ih);
      const w = iw * s, h = ih * s;
      this.ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    }
    tick() {
      const r = this.sec.getBoundingClientRect();
      if (r.bottom > -50 && r.top < innerHeight + 50) {
        const total = this.sec.offsetHeight - innerHeight;
        const p = clamp(-r.top / total, 0, 1);
        const target = p * (this.N - 1);
        this.cur += (target - this.cur) * .14;
        const idx = Math.round(this.cur);
        if (idx !== this.last || this.dirty) {
          const img = this.frame(idx);
          if (img) { this.draw(img); this.last = idx; this.dirty = false; }
        }
        const sp = this.cur / (this.N - 1);
        this.bar && (this.bar.style.transform = `scaleX(${sp})`);
        this.pct && (this.pct.textContent = String(Math.round(sp * 100)).padStart(2, '0'));
        this.hint && this.hint.classList.toggle('gone', p > .02);
        const n = this.stages.length;
        const a = Math.min(n - 1, Math.floor(p * n * .999));
        if (a !== this.active) {
          this.active = a;
          this.stages.forEach((s, i) => s.classList.toggle('on', i === a));
          this.steps.forEach((s, i) => { s.classList.toggle('on', i === a); s.classList.toggle('done', i < a); });
        }
      }
      requestAnimationFrame(this.tick);
    }
  }
  $$('.scrub[data-video]').forEach(s => new FrameScrub(s));

  /* ────────────────────────────────────────────────────────────
     8b. PRODUCT BREAKDOWN SLIDESHOW
     Pinned section; each scroll "notch" snaps to the next component.
     The trailer zooms (transform only → 60fps) into the part while a
     reticle, callout and spec panel swap in like a keynote slide.
     ──────────────────────────────────────────────────────────── */
  $$('[data-breakdown]').forEach(root => {
    const zoom = $('.bd-zoom', root), vig = $('.bd-vignette', root);
    const texts = $$('.bd-text', root), n = texts.length;
    const countEl = $('.bd-count b', root), word = $('.bd-bgword', root), call = $('.bd-callout', root);
    const thumbs = $('.bd-thumbs', root);
    thumbs.innerHTML = texts.map((t, i) => `<button type="button"><span>0${i + 1}</span>${t.dataset.name}</button>`).join('');
    const tbtn = $$('button', thumbs);
    $('.bd-count small', root).textContent = '/ 0' + n;
    const pose = t => { const s = +t.dataset.s; return { scale: s, xPercent: (.5 - t.dataset.fx) * 100 * s, yPercent: (.5 - t.dataset.fy) * 100 * s }; };
    let active = -1;
    const setActive = i => {
      if (i === active) return;
      active = i;
      const t = texts[i];
      countEl.textContent = '0' + (i + 1);
      word.textContent = t.dataset.name;
      root.classList.toggle('zoomed', +t.dataset.s > 1.05);
      call.innerHTML = `<small>${t.dataset.tag || 'Component'}</small><b>${t.dataset.callout || ''}</b>`;
      // replay reticle entrance
      root.classList.remove('zoomed'); void root.offsetWidth; root.classList.toggle('zoomed', +t.dataset.s > 1.05);
      tbtn.forEach((b, k) => b.classList.toggle('on', k === i));
      if (hasGSAP) gsap.fromTo(countEl, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .6, ease: 'expo.out' });
    };

    if (!hasGSAP || !window.ScrollTrigger || reduce || innerWidth <= 900) {
      root.classList.add('bd-stack');
      texts.forEach((t) => { t.style.opacity = '1'; t.style.visibility = 'visible'; t.style.position = 'relative'; });
      return;
    }
    gsap.set(zoom, pose(texts[0]));
    texts.forEach((t, i) => gsap.set(t, { autoAlpha: i ? 0 : 1 }));
    setActive(0);

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      scrollTrigger: {
        trigger: root, start: 'top top', end: () => '+=' + (n - 1) * innerHeight * 0.9,
        pin: true, scrub: .9, anticipatePin: 1, invalidateOnRefresh: true,
        snap: { snapTo: 'labels', duration: { min: .35, max: .9 }, delay: .08, ease: 'power2.inOut' },
        onUpdate: self => {
          const f = self.progress * (n - 1);
          setActive(Math.round(f));
          tbtn.forEach((b, k) => b.style.setProperty('--f', clamp(f - k + 1, 0, 1)));
        },
      },
    });
    tl.addLabel('s0', 0);
    for (let i = 1; i < n; i++) {
      const at = i - 1, p = pose(texts[i]);
      tl.to(zoom, { ...p, duration: 1 }, at)
        .to(vig, { opacity: +texts[i].dataset.s > 1.05 ? 1 : 0, duration: 1 }, at)
        .to(texts[i - 1], { autoAlpha: 0, y: -60, filter: 'blur(8px)', duration: .4, ease: 'power2.in' }, at)
        .fromTo(texts[i], { autoAlpha: 0, y: 70, filter: 'blur(8px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .5, ease: 'power3.out' }, at + .5)
        .addLabel('s' + i, i);
    }
    tbtn.forEach((b, k) => b.addEventListener('click', () => {
      const st = tl.scrollTrigger;
      scrollTo(st.start + (st.end - st.start) * (k / (n - 1)), { duration: 1.6 });
    }));
  });

  // Scroll-lit statement paragraph
  if (hasGSAP && window.ScrollTrigger && !reduce) {
    $$('[data-lit]').forEach(el => {
      const words = splitWords(el);
      gsap.to(words, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } });
    });
  }

  /* ────────────────────────────────────────────────────────────
     9. COMPONENTS
     ──────────────────────────────────────────────────────────── */

  // Hotspot anatomy explorer
  $$('[data-anatomy]').forEach(root => {
    const hots = $$('.hot', root), items = $$('.anatomy-list button', root);
    const set = i => {
      hots.forEach((h, k) => h.classList.toggle('on', k === i));
      items.forEach((b, k) => b.classList.toggle('on', k === i));
    };
    hots.forEach((h, i) => h.querySelector('button').addEventListener('click', () => set(h.classList.contains('on') ? -1 : i)));
    items.forEach((b, i) => b.addEventListener('click', () => set(i)));
    new IntersectionObserver((en, ob) => { if (en[0].isIntersecting) { set(0); ob.disconnect(); } }, { threshold: .5 }).observe(root);
  });

  // 3D Lab video switcher
  $$('[data-lab]').forEach(root => {
    const items = $$('.lab-item', root), vid = $('video', root), title = $('[data-lab-title]', root);
    let i = 0;
    const go = n => {
      i = (n + items.length) % items.length;
      items.forEach((it, k) => { it.classList.remove('on'); void it.offsetWidth; it.classList.toggle('on', k === i); });
      vid.classList.add('out');
      setTimeout(() => {
        vid.src = items[i].dataset.src;
        vid.play().catch(() => {});
        if (title) title.textContent = items[i].dataset.title;
      }, 350);
    };
    vid.addEventListener('loadeddata', () => vid.classList.remove('out'));
    vid.addEventListener('loadedmetadata', () => root.style.setProperty('--dur', (vid.duration || 8) + 's'));
    vid.addEventListener('ended', () => go(i + 1));
    items.forEach((it, k) => it.addEventListener('click', () => go(k)));
    items[0].classList.add('on');
  });

  // Tween a numeric element
  const tweenNum = (el, val, dec = 0) => {
    if (!el) return;
    if (!hasGSAP) { el.textContent = (+val).toFixed(dec); return; }
    const o = { v: parseFloat(el.textContent) || 0 };
    gsap.to(o, { v: val, duration: .9, ease: 'power3.out', onUpdate: () => { el.textContent = o.v.toFixed(dec); } });
  };

  // Flatbed deck-length visualiser
  const lv = $('#lengthViz');
  if (lv) {
    const data = {
      40: { pay: 35, ax: 2, tare: 6.8, susp: 'Tandem 13T' },
      48: { pay: 42, ax: 3, tare: 7.6, susp: 'Tridem 16T' },
      60: { pay: 48, ax: 3, tare: 9.1, susp: 'Tridem 16T' },
      80: { pay: 55, ax: 4, tare: 11.4, susp: 'Quad + lift axle' },
    };
    const deck = $('.deck', lv), axles = $('.axles', lv), dim = $('.dim', lv);
    const set = len => {
      const d = data[len], w = len / 80 * 100;
      deck.style.width = w + '%';
      dim.style.width = w + '%';
      axles.style.left = (w - 2) + '%';
      axles.innerHTML = '<i></i>'.repeat(d.ax);
      $('span', dim).textContent = `${len} FT · ${(len * .3048).toFixed(1)} M`;
      tweenNum($('[data-o="pay"]', lv), d.pay);
      tweenNum($('[data-o="ax"]', lv), d.ax);
      tweenNum($('[data-o="tare"]', lv), d.tare, 1);
      $('[data-o="susp"]', lv).textContent = d.susp;
      $$('.tab', lv).forEach(t => t.classList.toggle('on', +t.dataset.len === len));
    };
    $$('.tab', lv).forEach(t => t.addEventListener('click', () => set(+t.dataset.len)));
    set(48);
  }

  // Skeletal container configurator
  const cv = $('#containerViz');
  if (cv) {
    const cfg = {
      '20': { chassis: 52, boxes: [[4, 44, '20′']], tare: 3.1, pay: 34, locks: 4, ax: 2 },
      '40': { chassis: 88, boxes: [[3, 82, '40′ HC']], tare: 3.45, pay: 40, locks: 8, ax: 3 },
      '2x20': { chassis: 88, boxes: [[3, 40.5, '20′'], [44.5, 40.5, '20′', 'orange']], tare: 3.45, pay: 40, locks: 12, ax: 3 },
      '45': { chassis: 100, boxes: [[2, 94, '45′ HC']], tare: 3.75, pay: 42, locks: 12, ax: 3 },
    };
    const ch = $('.chassis', cv), ax = $('.axles', cv), holder = $('.boxes', cv);
    const set = k => {
      const c = cfg[k];
      ch.style.width = c.chassis + '%';
      ax.style.left = (c.chassis - 1.5) + '%';
      ax.innerHTML = '<i></i>'.repeat(c.ax);
      holder.innerHTML = c.boxes.map(([l, w, t, cls], i) => `<div class="box ${cls || ''}" style="left:${l * c.chassis / 100}%;width:${w * c.chassis / 100}%;animation-delay:${i * .12}s">${t}</div>`).join('');
      tweenNum($('[data-o="tare"]', cv), c.tare, 2);
      tweenNum($('[data-o="pay"]', cv), c.pay);
      tweenNum($('[data-o="locks"]', cv), c.locks);
      tweenNum($('[data-o="ax"]', cv), c.ax);
      $$('.tab', cv).forEach(t => t.classList.toggle('on', t.dataset.c === k));
    };
    $$('.tab', cv).forEach(t => t.addEventListener('click', () => set(t.dataset.c)));
    set('40');
  }

  // Livery colour configurator
  $$('[data-livery]').forEach(root => {
    const tint = $('.tint', root), floor = $('.floor', root), name = $('[data-livery-name]', root);
    $$('.sw', root).forEach(sw => sw.addEventListener('click', () => {
      $$('.sw', root).forEach(s => s.classList.toggle('on', s === sw));
      tint.style.backgroundColor = sw.dataset.color === 'none' ? 'transparent' : sw.dataset.color;
      floor && floor.style.setProperty('--glow', sw.dataset.glow);
      if (name) name.textContent = sw.dataset.name;
      if (hasGSAP) gsap.fromTo(root.querySelector('.livery'), { scale: .98 }, { scale: 1, duration: .8, ease: 'expo.out' });
    }));
  });

  // Payload calculator
  const calc = $('#calc');
  if (calc) {
    const r = $('input[type=range]', calc);
    const upd = () => {
      const v = +r.value;
      r.style.setProperty('--p', ((v - r.min) / (r.max - r.min) * 100) + '%');
      $('[data-o="t"]', calc).textContent = v;
      const tier = v <= 30 ? ['Tandem 13T', 'IS-2062 E250', '40 ft'] : v <= 45 ? ['Tridem 16T', 'IS-2062 E350', '48 ft'] : ['Tridem + Lift', 'IS-2062 E450', '60–80 ft'];
      $('[data-o="ax"]', calc).textContent = tier[0];
      $('[data-o="st"]', calc).textContent = tier[1];
      $('[data-o="len"]', calc).textContent = tier[2];
      $('[data-o="gcw"]', calc).textContent = (v + 17).toFixed(0);
    };
    r.addEventListener('input', upd); upd();
  }

  // Generic tab panels: [data-tabs] > .tab[data-t] and [data-panel]
  $$('[data-tabs]').forEach(root => {
    const tabs = $$('.tab[data-t]', root), panels = $$('[data-panel]', root);
    tabs.forEach(t => t.addEventListener('click', () => {
      tabs.forEach(x => x.classList.toggle('on', x === t));
      panels.forEach(p => {
        const on = p.dataset.panel === t.dataset.t;
        p.hidden = !on;
        if (on && hasGSAP) gsap.fromTo(p.children, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .05, ease: 'expo.out' });
      });
    }));
  });

  // Hero background video sound toggle etc. (optional hooks)
  $$('[data-toggle-video]').forEach(b => b.addEventListener('click', () => {
    const v = document.getElementById(b.dataset.toggleVideo);
    if (!v) return;
    v.paused ? v.play() : v.pause();
    b.textContent = v.paused ? 'Play' : 'Pause';
  }));

  /* ────────────────────────────────────────────────────────────
     10. BOOT
     ──────────────────────────────────────────────────────────── */
  const boot = () => playEnter();
  if (document.readyState === 'complete') boot();
  else {
    let booted = false;
    const go = () => { if (!booted) { booted = true; boot(); } };
    addEventListener('load', go);
    setTimeout(go, 1600);
  }
})();

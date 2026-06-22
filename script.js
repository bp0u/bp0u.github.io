/* ════════════════════════════════════════
   ABDALLAH MOHAMED — CYBERNETIC PORTFOLIO
   script.js
   ════════════════════════════════════════ */

'use strict';

const CLASS_VARIANTS = ['cyan', 'purple', 'error'];
const CLASS_LABELS = ['CLASS_01', 'CLASS_04', 'CLASS_EXPERIMENTAL', 'CLASS_09'];
const BTN_VARIANTS = ['btn-primary', 'btn-purple', 'btn-error-outline'];

/* ── FADE-UP ANIMATIONS ── */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

const scrollRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        scrollRevealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

function observeRevealElements(root = document) {
  root.querySelectorAll('.fade-up').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setTimeout(() => el.classList.add('visible'), 50);
    } else {
      fadeObserver.observe(el);
    }
  });

  root.querySelectorAll('.scroll-reveal').forEach(el => scrollRevealObserver.observe(el));
}

/* ── LOAD PROJECTS FROM projects.json ── */
async function loadProjects() {
  const projectFeed = document.getElementById('projectFeed');
  if (!projectFeed) return;

  try {
    const res = await fetch('projects.json');
    const projects = await res.json();

    projectFeed.innerHTML = projects.map((p, i) => {
      const reverse = i % 2 === 1;
      const variant = CLASS_VARIANTS[i % CLASS_VARIANTS.length];
      const classLabel = CLASS_LABELS[i % CLASS_LABELS.length];
      const btnClass = BTN_VARIANTS[i % BTN_VARIANTS.length];
      const tagsHtml = p.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
      const specLines = (p.specs || p.tags.slice(0, 3)).map(s =>
        `<p>${s.includes(':') ? s : `TECH: ${s.toUpperCase()}`}</p>`
      ).join('');
      const imageHtml = p.image
        ? `<img class="media-image" src="${p.image}" alt="${p.title}" loading="lazy" />`
        : `<div class="media-placeholder">${p.title.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>`;

      return `
        <article class="project-row scroll-reveal${reverse ? ' project-row--reverse' : ''}">
          <div class="project-info">
            <span class="project-class project-class--${variant}">${classLabel}</span>
            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc">${p.description}</p>
            <div class="project-spec">${specLines || '<p>STATUS: DEPLOYED</p>'}</div>
            <div class="project-tags">${tagsHtml}</div>
            <a href="${p.link}" target="_blank" rel="noopener" class="btn ${btnClass} btn-sm">
              ${p.linkLabel || 'View Protocol'}
            </a>
          </div>
          <div class="project-media">
            <div class="pipeline-connector" aria-hidden="true"></div>
            <div class="media-frame">
              <span class="corner-bracket bracket-tl"></span>
              <span class="corner-bracket bracket-tr"></span>
              <span class="corner-bracket bracket-bl"></span>
              <span class="corner-bracket bracket-br"></span>
              <span class="scanline" aria-hidden="true"></span>
              ${imageHtml}
            </div>
          </div>
        </article>
      `;
    }).join('');

    observeRevealElements(projectFeed);

  } catch (err) {
    projectFeed.innerHTML = `
      <p class="project-desc" style="text-align:center;color:var(--on-surface-variant);">
        &gt; error: could not load projects.json
      </p>`;
    console.error('Failed to load projects.json:', err);
  }
}

/* ── SCANLINE FLICKER ── */
setInterval(() => {
  const scan = document.querySelector('.scanline-overlay');
  if (scan) scan.style.opacity = (0.8 + Math.random() * 0.2).toString();
}, 100);

/* ── HERO PARALLAX ── */
const parallaxTarget = document.querySelector('.parallax-target');
const heroSection = document.getElementById('hero');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (parallaxTarget && !prefersReducedMotion) {
  document.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (e.clientX - centerX) / 50;
    const moveY = (e.clientY - centerY) / 50;
    const rotateX = (centerY - e.clientY) / 100;
    const rotateY = (e.clientX - centerX) / 100;
    parallaxTarget.style.transform =
      `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
}

/* ── NAV: shrink + active link on scroll ── */
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

if (nav && heroSection) {
  const navObserver = new IntersectionObserver(
    ([entry]) => nav.classList.toggle('scrolled', !entry.isIntersecting),
    { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
  );
  navObserver.observe(heroSection);
}

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach(s => activeObserver.observe(s));

/* ── PIPELINE CONDUIT SCROLL ── */
const conduit = document.querySelector('.pipeline-conduit');
if (conduit) {
  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    conduit.style.background =
      `linear-gradient(to bottom, transparent, #00dbe9, #b600f8, #00dbe9, transparent) ${scrollPercent}%`;
  }, { passive: true });
}

/* ── SCROLL PROGRESS ── */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  width: 0%;
  background: linear-gradient(90deg, #00dbe9, #b600f8);
  z-index: 9998;
  transition: width 0.1s linear;
  pointer-events: none;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });

/* ── MOBILE MENU TOGGLE ── */
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isActive = menuToggle.classList.contains('active');
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isActive);
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-inner')) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── TOUCH PARALLAX ── */
if (parallaxTarget && !prefersReducedMotion) {
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  });

  document.addEventListener('touchmove', (e) => {
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const moveX = (touchX - touchStartX) / 50;
    const moveY = (touchY - touchStartY) / 50;
    
    if (heroSection && heroSection.getBoundingClientRect().top < window.innerHeight) {
      parallaxTarget.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    }
  }, { passive: true });

  document.addEventListener('touchend', () => {
    if (heroSection && heroSection.getBoundingClientRect().top < window.innerHeight) {
      parallaxTarget.style.transform = 'translate3d(0, 0, 0)';
    }
  }, { passive: true });
}

/* ── PREVENT ZOOM ON DOUBLE TAP (BETTER MOBILE UX) ── */
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, false);

/* ── INIT ── */
loadProjects();

setTimeout(() => {
  document.body.classList.add('js-loaded');
  observeRevealElements();
}, 50);

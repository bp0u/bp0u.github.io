/* ════════════════════════════════════════
   ABDALLAH MOHAMED — PORTFOLIO
   script.js
   ════════════════════════════════════════ */

'use strict';

/* ── LOAD PROJECTS FROM projects.json ── */
async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  try {
    const res = await fetch('projects.json');
    const projects = await res.json();

    let html = '';

    projects.forEach((p, i) => {
      const delay = (i * 0.1).toFixed(1);
      const tagsHtml = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
      html += `
        <div class="project-card fade-up" style="--delay:${delay}s">
          <span class="project-num">${String(i + 1).padStart(3, '0')}</span>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-tags">${tagsHtml}</div>
          <a href="${p.link}" target="_blank" rel="noopener" class="project-link">
            ${p.linkLabel || 'View project'} <span>→</span>
          </a>
        </div>
      `;
    });

    // Always add the "coming soon" placeholder at the end
    html += `
      <div class="project-card project-placeholder fade-up" style="--delay:${(projects.length * 0.1).toFixed(1)}s">
        <span class="placeholder-plus">+</span>
        <span>More projects coming soon</span>
      </div>
    `;

    grid.innerHTML = html;

    // Re-observe new fade-up elements
    grid.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

    // Re-attach project card hover listeners
    grid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const title = card.querySelector('.project-title');
        if (title) title.style.letterSpacing = '0.01em';
      });
      card.addEventListener('mouseleave', () => {
        const title = card.querySelector('.project-title');
        if (title) title.style.letterSpacing = '';
      });
    });

  } catch (err) {
    grid.innerHTML = `<p style="color:var(--ink-3);font-family:var(--font-mono);font-size:13px;">Could not load projects.</p>`;
    console.error('Failed to load projects.json:', err);
  }
}

loadProjects();

/* ── THEME TOGGLE ── */
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Restore saved theme on load
(function () {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
})();

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});


/* ── CUSTOM CURSOR ── */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;
let raf;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  raf = requestAnimationFrame(animateTrail);
}
animateTrail();

// Hide cursor when mouse leaves window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorTrail.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorTrail.style.opacity = '0.5';
});

// Cursor scale on interactive elements
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
    cursor.style.background = 'var(--accent-2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'var(--accent)';
  });
});

// Fallback: hide custom cursor on touch devices
if (window.matchMedia('(hover: none)').matches) {
  cursor.style.display = 'none';
  cursorTrail.style.display = 'none';
  html.style.cursor = 'auto';
  document.querySelectorAll('*').forEach(el => (el.style.cursor = ''));
}


/* ── NAV: shrink on scroll ── */
const nav = document.getElementById('nav');

const navObserver = new IntersectionObserver(
  ([entry]) => nav.classList.toggle('scrolled', !entry.isIntersecting),
  { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
);
navObserver.observe(document.getElementById('hero'));


/* ── FADE-UP ANIMATIONS (IntersectionObserver) ── */
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

document.querySelectorAll('.fade-up').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    setTimeout(() => el.classList.add('visible'), 100);
  } else {
    fadeObserver.observe(el);
  }
});


/* ── SKILL BARS: animate width on scroll ── */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
          setTimeout(() => bar.classList.add('animated'), i * 80);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skill-group').forEach(el => skillObserver.observe(el));


/* ── SMOOTH ACTIVE NAV LINK on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

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
  { threshold: 0.4 }
);

sections.forEach(s => activeObserver.observe(s));


/* ── TYPED HERO ROLE (optional subtle effect) ── */
// Adds a blinking cursor after the role text for a polished touch
const roleEl = document.querySelector('.hero-role');
if (roleEl) {
  const cursor_el = document.createElement('span');
  cursor_el.textContent = '|';
  cursor_el.style.cssText = `
    color: var(--accent);
    animation: blink 1s step-start infinite;
    margin-left: 2px;
    font-weight: 300;
  `;
  const style = document.createElement('style');
  style.textContent = `@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`;
  document.head.appendChild(style);
  roleEl.appendChild(cursor_el);
}


/* ── HERO CARD: subtle mouse parallax ── */
const heroCard = document.querySelector('.hero-card');
if (heroCard) {
  document.querySelector('#hero').addEventListener('mousemove', (e) => {
    const rect = document.querySelector('#hero').getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    heroCard.style.transform = `
      translateY(${dy * -10}px)
      rotateX(${dy * 4}deg)
      rotateY(${dx * -4}deg)
    `;
  });

  document.querySelector('#hero').addEventListener('mouseleave', () => {
    heroCard.style.transform = '';
  });
}


/* ── PROJECT CARD: letter spacing hover on title ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const title = card.querySelector('.project-title');
    if (title) title.style.letterSpacing = '0.01em';
  });
  card.addEventListener('mouseleave', () => {
    const title = card.querySelector('.project-title');
    if (title) title.style.letterSpacing = '';
  });
});


/* ── SCROLL PROGRESS INDICATOR ── */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  width: 0%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  z-index: 9998;
  transition: width 0.1s linear;
  pointer-events: none;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop    = window.scrollY;
  const docHeight    = document.body.scrollHeight - window.innerHeight;
  const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });


/* ── CONTACT SECTION: invert nav links text for dark bg ── */
// When contact section visible, update nav link color via class
const contactSection = document.querySelector('#contact');
if (contactSection) {
  const contactNavObserver = new IntersectionObserver(
    ([entry]) => nav.classList.toggle('on-dark', entry.isIntersecting),
    { threshold: 0.5 }
  );
  contactNavObserver.observe(contactSection);
}

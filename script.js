(() => {
  const root = document.documentElement;
  const nav = document.getElementById("nav");
  const themeToggle = document.getElementById("themeToggle");
  const cursor = document.getElementById("cursor");
  const cursorTrail = document.getElementById("cursorTrail");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const THEME_KEY = "portfolio-theme";

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      return;
    }
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }

  function initThemeToggle() {
    if (!themeToggle) return;
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  function initScrollEffects() {
    window.addEventListener(
      "scroll",
      () => {
        if (!nav) return;
        nav.classList.toggle("scrolled", window.scrollY > 10);
      },
      { passive: true }
    );
  }

  function initRevealAnimations() {
    const animated = document.querySelectorAll(".fade-up");
    if (!animated.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    animated.forEach((el) => observer.observe(el));
  }

  function initActiveNavSection() {
    if (!sections.length || !navLinks.length) return;

    const sectionById = new Map(sections.map((section) => [section.id, section]));
    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        });
        if (!best) return;
        const id = best.target.id;
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          link.classList.toggle("active", href === `#${id}`);
        });
      },
      { threshold: [0.2, 0.45, 0.7] }
    );

    sectionById.forEach((section) => observer.observe(section));
  }

  function initCustomCursor() {
    // Hide custom cursor on touch-only devices.
    const canHover =
      window.matchMedia && window.matchMedia("(hover: hover)").matches;
    if (!canHover || !cursor || !cursorTrail) {
      if (cursor) cursor.style.display = "none";
      if (cursorTrail) cursorTrail.style.display = "none";
      return;
    }

    const move = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      cursorTrail.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", move, { passive: true });

  }

  function init() {
    initTheme();
    initThemeToggle();
    initScrollEffects();
    initRevealAnimations();
    initActiveNavSection();
    initCustomCursor();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

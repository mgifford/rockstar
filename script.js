const revealNodes = Array.from(document.querySelectorAll('.reveal'));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.14,
  }
);

revealNodes.forEach((node, index) => {
  node.style.transitionDelay = `${index * 90}ms`;
  revealObserver.observe(node);
});

// Dark mode
const STORAGE_KEY = 'brickstar-theme';
const toggleBtn = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (toggleBtn) {
    toggleBtn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

applyTheme(getInitialTheme());

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });
}

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

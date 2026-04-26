const footerStatus = document.querySelector("#footer-status");
const revealItems = document.querySelectorAll(".reveal");

if (footerStatus) {
  const year = new Date().getFullYear();
  footerStatus.textContent = `Publishing from GitHub Pages in ${year}.`;
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 320)}ms`;
  revealObserver.observe(item);
});

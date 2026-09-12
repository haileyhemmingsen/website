// =========================================================
// CONFIG — edit these to personalize the site
// =========================================================
const ROLES = [
  "R&D Software Engineer",
  "Hardware-Software Integration",
  "Automated Test Engineer",
  "Python & C# Developer",
];

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// =========================================================
// FOOTER YEAR
// =========================================================
document.getElementById("year").textContent = new Date().getFullYear();

// =========================================================
// HEADER: background on scroll
// =========================================================
const header = document.getElementById("siteHeader");
function updateHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}
updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

// =========================================================
// MOBILE MENU
// =========================================================
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

// Close mobile menu after tapping a link
mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

// =========================================================
// HERO ROLE ROTATOR (simple type/erase effect)
// =========================================================
const roleTextEl = document.getElementById("roleText");
let roleIndex = 0;
let charIndex = ROLES[0].length;
let isDeleting = false;

function tickRole() {
  const current = ROLES[roleIndex];

  if (isDeleting) {
    charIndex -= 1;
  } else {
    charIndex += 1;
  }

  roleTextEl.textContent = current.slice(0, charIndex);

  let delay = isDeleting ? 40 : 70;

  if (!isDeleting && charIndex === current.length) {
    delay = 1600; // pause at full word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % ROLES.length;
    delay = 300;
  }

  setTimeout(tickRole, delay);
}

if (prefersReducedMotion) {
  roleTextEl.textContent = ROLES[0];
} else {
  setTimeout(tickRole, 1600);
}

// =========================================================
// SCROLL REVEAL
// =========================================================
const revealEls = document.querySelectorAll("[data-reveal]");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
}

// =========================================================
// CONTACT FORM (front-end only)
// =========================================================
// const contactForm = document.getElementById("contactForm");
// const formStatus = document.getElementById("formStatus");

// contactForm.addEventListener("submit", (event) => {
//   event.preventDefault();

//   if (!contactForm.checkValidity()) {
//     formStatus.textContent = "Please fill in every field before sending.";
//     return;
//   }

//   // NOTE: This is a front-end-only demo. Wire this up to a real backend
//   // (e.g. Formspree, a serverless function, or your own API) to actually
//   // deliver messages. See the README for suggestions.
//   formStatus.textContent = "Thanks! Your message has been noted (demo only — see README to connect this to a real inbox).";
//   contactForm.reset();
// });
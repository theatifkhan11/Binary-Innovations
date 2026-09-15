// Binary Innovations — shared site behavior. Kept deliberately small:
// a mobile nav toggle, dynamic footer year, and two small contact-page
// helpers. No frameworks, no build step.

// Footer year, on every page that includes #year
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("is-open"));
  });
}

// Contact page — copy email to clipboard
const copyBtn = document.querySelector("[data-copy-email]");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.getAttribute("data-copy-email");
    try {
      await navigator.clipboard.writeText(email);
      const original = copyBtn.textContent;
      copyBtn.textContent = "Copied";
      setTimeout(() => (copyBtn.textContent = original), 1800);
    } catch (e) {
      // Clipboard API unavailable — silently ignore, the address is
      // still visible and selectable on the page.
    }
  });
}

// Contact page — build a mailto: link from the form fields. There is no
// backend, so this opens the visitor's mail client with the message
// prefilled rather than pretending to submit anywhere.
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = contactForm.name.value.trim();
    const from = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const to = contactForm.getAttribute("data-to");
    const subject = encodeURIComponent(`Inquiry from ${name || "website visitor"}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${from}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

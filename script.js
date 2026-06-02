// Menu mobile, scroll suave, animacoes de entrada e efeitos do hero.
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = document.querySelectorAll(".main-nav a, .btn[href^='#'], .site-footer a[href^='#'], .float-cta");
const year = document.querySelector("[data-year]");
const floatCta = document.querySelector("[data-float-cta]");
const sparkLayer = document.querySelector("[data-sparks]");
const tiltCard = document.querySelector("[data-tilt]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileViewport = window.matchMedia("(max-width: 780px)");

const closeMenu = () => {
  if (!nav || !menuToggle) return;

  document.body.classList.remove("menu-open");
  nav.classList.remove("is-open");
  menuToggle.classList.remove("is-active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
};

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.classList.toggle("is-active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    closeMenu();
    target.scrollIntoView({
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
      block: "start",
    });
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav && nav.classList.contains("is-open")) {
    closeMenu();
  }
});

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const updateFloatCta = () => {
  if (!floatCta || !mobileViewport.matches) return;
  floatCta.classList.toggle("is-visible", window.scrollY > 420);
};

updateHeader();
updateFloatCta();
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("scroll", updateFloatCta, { passive: true });

// Elementos revelam ao entrar na tela.
const revealElements = document.querySelectorAll(".reveal");

if (mobileViewport.matches || prefersReducedMotion.matches) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -70px 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

// Contadores curtos para a faixa de impacto.
const counters = document.querySelectorAll("[data-count]");

if ("IntersectionObserver" in window && counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        const target = Number(element.dataset.count);
        const duration = 900;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = Math.round(target * eased);

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(element);
      });
    },
    { threshold: 0.65 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

// Linhas de energia no fundo, geradas com posicoes variadas.
if (sparkLayer && !mobileViewport.matches && !prefersReducedMotion.matches) {
  const totalSparks = 24;

  for (let index = 0; index < totalSparks; index += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.setProperty("--x", `${Math.random() * 100}%`);
    spark.style.setProperty("--y", `${Math.random() * 100}%`);
    spark.style.setProperty("--w", `${50 + Math.random() * 110}px`);
    spark.style.setProperty("--r", `${-18 + Math.random() * 36}deg`);
    spark.style.setProperty("--d", `${4 + Math.random() * 7}s`);
    spark.style.setProperty("--delay", `${Math.random() * -9}s`);
    sparkLayer.appendChild(spark);
  }
}

// Movimento sutil do mockup no desktop.
if (tiltCard && window.matchMedia("(hover: hover)").matches) {
  tiltCard.addEventListener("mousemove", (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    tiltCard.style.setProperty("--tilt-x", `${x * 8}deg`);
    tiltCard.style.setProperty("--tilt-y", `${y * -8}deg`);
  });

  tiltCard.addEventListener("mouseleave", () => {
    tiltCard.style.setProperty("--tilt-x", "0deg");
    tiltCard.style.setProperty("--tilt-y", "0deg");
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}

// Para usar WhatsApp, coloque o numero com DDI e DDD abaixo.
// Exemplo: const whatsappNumber = "5511999999999";
const whatsappNumber = "";
const whatsappMessage = "Olá! Gostaria de solicitar um orçamento para criação de site.";

if (floatCta && whatsappNumber) {
  const encodedMessage = encodeURIComponent(whatsappMessage);
  floatCta.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  floatCta.target = "_blank";
  floatCta.rel = "noopener";
  floatCta.setAttribute("aria-label", "Solicitar orçamento pelo WhatsApp");
}

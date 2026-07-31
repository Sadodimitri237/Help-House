/**
 * CONTROLLER — Help House
 * Orchestre le Model et la View. Gère tous les événements utilisateur.
 */
const Controller = {

  init() {
    // Rendu initial de toutes les sections
    View.renderNavbar(Model.association);
    View.renderHero(Model.association);
    // View.renderImpact(Model.impact);
    View.renderMission(Model.mission);
    View.renderDonsFinanciers(Model.donsFinanciers);
    // View.renderDonsNature(Model.donsNature);
    View.renderContact(Model.association);

    // Liaison des événements
    this._bindNavbarScroll();
    this._bindSmoothScroll();
    this._bindCopyButtons();
    this._bindContactForm();
    this._bindAnimations();
  },

  /* ── Navbar ombrage au scroll ────────────────────────── */
  _bindNavbarScroll() {
    window.addEventListener("scroll", () => {
      View.setNavbarScrolled(window.scrollY > 40);
    });
  },

  /* ── Scroll doux vers les ancres ─────────────────────── */
  _bindSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        // Ferme le menu mobile si ouvert
        const navbarCollapse = document.getElementById("navbarNav");
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
        }
        const offset = document.getElementById("main-navbar").offsetHeight + 12;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: "smooth",
        });
      });
    });
  },

  /* ── Copie du numéro dans le presse-papier ────────────── */
  _bindCopyButtons() {
    document.addEventListener("click", e => {
      const btn = e.target.closest(".btn-copy");
      if (!btn) return;
      const numero = btn.dataset.numero;
      const id     = btn.dataset.id;
      if (!numero) return;
      navigator.clipboard.writeText(numero.replace(/\s/g, ""))
        .then(() => {
          View.showCopySuccess(id);
          View.showToast(`Numéro ${numero} copié !`);
        })
        .catch(() => {
          View.showToast("Impossible de copier. Veuillez le noter manuellement.");
        });
    });
  },

  /* ── Formulaire de contact ───────────────────────────── */
  _bindContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.setAttribute("action", "https://formsubmit.co/helphousecmr@gmail.com");
    form.setAttribute("method", "POST");
    form.setAttribute("accept-charset", "utf-8");

    const subjectInput = form.querySelector('input[name="_subject"]');
    if (!subjectInput) {
      const hiddenSubject = document.createElement("input");
      hiddenSubject.type = "hidden";
      hiddenSubject.name = "_subject";
      hiddenSubject.value = "Nouveau message Help House";
      form.appendChild(hiddenSubject);
    }

    const captchaInput = form.querySelector('input[name="_captcha"]');
    if (!captchaInput) {
      const hiddenCaptcha = document.createElement("input");
      hiddenCaptcha.type = "hidden";
      hiddenCaptcha.name = "_captcha";
      hiddenCaptcha.value = "false";
      form.appendChild(hiddenCaptcha);
    }

    form.addEventListener("submit", e => {
      e.preventDefault();

      const nom = form.querySelector("#contact-nom").value.trim();
      const emailVal = form.querySelector("#contact-email").value.trim();
      const sujet = form.querySelector("#contact-sujet").value.trim();
      const message = form.querySelector("#contact-message").value.trim();

      if (!nom || !emailVal || !message) {
        View.showFormError("Veuillez remplir tous les champs.");
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Envoi…';

      form.querySelector('input[name="_subject"]').value = `Nouveau message Help House - ${sujet || "Autre"}`;
      form.submit();
    });
  },

  /* ── Animations d'apparition au scroll ───────────────── */
  _bindAnimations() {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach(el => {
      observer.observe(el);
    });
  },
};

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

  /* ── Formulaire de contact (simulation AJAX) ──────────── */
  _bindContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", e => {
      e.preventDefault();

      const nom     = form.querySelector("#contact-nom").value.trim();
      const emailVal= form.querySelector("#contact-email").value.trim();
      const message = form.querySelector("#contact-message").value.trim();

      if (!nom || !emailVal || !message) {
        View.showFormError("Veuillez remplir tous les champs.");
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Envoi…';

      // Simulation d'un appel AJAX (XMLHttpRequest)
      this._ajaxSend({ nom, email: emailVal, message }, () => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Envoyer le message';
        View.showFormSuccess();
      }, (err) => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Envoyer le message';
        View.showFormError(err);
      });
    });
  },

  /* ── Simulation d'envoi AJAX ──────────────────────────── */
  _ajaxSend(payload, onSuccess, onError) {
    // En production, remplacer l'URL par votre endpoint réel
    // et retirer la simulation setTimeout.
    console.log("[AJAX] Envoi du formulaire :", payload);

    // Simulation d'un délai réseau (~1 s)
    setTimeout(() => {
      // Simuler un succès (taux 100% en démo)
      const ok = true;
      if (ok) {
        onSuccess();
      } else {
        onError("Erreur serveur. Veuillez réessayer plus tard.");
      }
    }, 1200);

    /* ── Modèle réel avec XMLHttpRequest ──────────────────
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/contact", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        onSuccess();
      } else {
        onError("Erreur " + xhr.status + ". Veuillez réessayer.");
      }
    };
    xhr.onerror = () => onError("Problème de connexion.");
    xhr.send(JSON.stringify(payload));
    ─────────────────────────────────────────────────────── */
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

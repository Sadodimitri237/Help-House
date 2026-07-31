/**
 * VIEW — Help House
 * Génère et met à jour le DOM. Ne contient aucune logique métier.
 */
const View = {

  /* ── Navbar ─────────────────────────────────────────── */
  renderNavbar(data) {
    document.getElementById("nav-logo").src = data.logo;
    document.getElementById("nav-brand").textContent = data.nom;
    document.getElementById("btn-instagram").href = data.instagram;
    document.getElementById("btn-instagram-mobile").href = data.instagram;
    document.getElementById("btn-linkedin").href = data.linkedin;
    document.getElementById("btn-linkedin-mobile").href = data.linkedin;
  },

  /* ── Hero ────────────────────────────────────────────── */
  renderHero(data) {
    document.getElementById("hero-slogan").textContent = data.slogan;
    document.getElementById("hero-description").textContent = data.description;
    document.getElementById("hero-instagram").href = data.instagram;
    document.getElementById("hero-linkedin").href = data.linkedin;
  },

  /* ── Impact ──────────────────────────────────────────── */
  renderImpact(stats) {
    const container = document.getElementById("impact-stats");
    container.innerHTML = stats.map(s => `
      <div class="col-6 col-md-3">
        <div class="impact-card text-center p-4">
          <div class="impact-valeur">${s.valeur}</div>
          <div class="impact-libelle">${s.libelle}</div>
        </div>
      </div>`).join("");
  },

  /* ── Mission ─────────────────────────────────────────── */
  renderMission(items) {
    const container = document.getElementById("mission-cards");
    container.innerHTML = items.map(item => `
      <div class="col-md-4">
        <div class="mission-card p-4 h-100">
          <div class="mission-icone mb-3">
            <i class="bi ${item.icone}"></i>
          </div>
          <h5 class="mission-titre">${item.titre}</h5>
          <p class="mission-texte">${item.texte}</p>
        </div>
      </div>`).join("");
  },

  /* ── Dons financiers ─────────────────────────────────── */
  renderDonsFinanciers(dons) {
    const container = document.getElementById("dons-financiers-cards");
    container.innerHTML = dons.map(don => {
      if (don.lien) {
        // Carte virement bancaire
        if (don.lien === "#contact") {
         // Don en nature
         return `
           <div class="col-md-4">
             <div class="don-card h-100 p-4 d-flex flex-column">
               <div class="don-icone mb-3" style="color:${don.couleur}">
                 <i class="bi ${don.icone}"></i>
               </div>
               <h5 class="don-operateur">${don.operateur}</h5>
               <p class="don-instructions flex-grow-1">${don.instructions}</p>
               <a href="${don.lien}" target="_blank" rel="noopener noreferrer"
                  class="btn btn-primary-hh mt-3 w-100">
                 <i class="bi bi-chat-dots-fill me-2"></i>Nous contacter
               </a>
             </div>
           </div>`;
       }
        return `
          <div class="col-md-4">
            <div class="don-card h-100 p-4 d-flex flex-column">
              <div class="don-icone mb-3" style="color:${don.couleur}">
                <i class="bi ${don.icone}"></i>
              </div>
              <h5 class="don-operateur">${don.operateur}</h5>
              <p class="don-instructions flex-grow-1">${don.instructions}</p>
              <a href="${don.lien}" target="_blank" rel="noopener noreferrer"
                 class="btn btn-primary-hh mt-3 w-100">
                <i class="bi bi-box-arrow-up-right me-2"></i>Effectuer un virement
              </a>
            </div>
          </div>`;
      }
      // Carte mobile money
      return `
        <div class="col-md-4">
          <div class="don-card h-100 p-4 d-flex flex-column">
            <div class="don-icone mb-3" style="color:${don.couleur}">
              <i class="bi ${don.icone}"></i>
            </div>
            <h5 class="don-operateur">${don.operateur}</h5>
            <div class="don-numero-wrapper mb-3">
              <span class="don-numero" id="num-${don.id}">${don.numero}</span>
              <button class="btn btn-copy ms-2" data-numero="${don.numero}" data-id="${don.id}"
                title="Copier le numéro">
                <i class="bi bi-clipboard" id="icon-${don.id}"></i>
              </button>
            </div>
            <div>
              <span class="don-numero" id="num-${don.id}">${don.numero1}</span>
              <button class="btn btn-copy ms-2" data-numero="${don.numero1}" data-id="${don.numero1}"
                title="Copier le numéro">
                <i class="bi bi-clipboard" id="icon-${don.id}"></i>
              </button>
            </div>
            <p class="don-instructions flex-grow-1">${don.instructions}</p>
          </div>
        </div>`;
    }).join("");
  },

  /* ── Dons en nature ──────────────────────────────────── */
  renderDonsNature(data) {
    document.getElementById("nature-intro").textContent = data.intro;
    const container = document.getElementById("nature-categories");
    container.innerHTML = data.categories.map(cat => `
      <div class="col-6 col-md-4">
        <div class="nature-item d-flex align-items-center gap-3 p-3">
          <i class="bi ${cat.icone} nature-icone"></i>
          <span>${cat.libelle}</span>
        </div>
      </div>`).join("");
  },

  /* ── Contact ─────────────────────────────────────────── */
  renderContact(data) {
    document.getElementById("contact-email-link").href = `mailto:${data.email}`;
    document.getElementById("contact-email-text").textContent = data.email;
    document.getElementById("contact-instagram-link").href = data.instagram;
    document.getElementById("contact-linkedin-link").href = data.linkedin;
    const footerLinkedin = document.getElementById("footer-linkedin");
    if (footerLinkedin) {
      footerLinkedin.href = data.linkedin;
    }
  },

  /* ── Feedback copie ──────────────────────────────────── */
  showCopySuccess(id) {
    const icon = document.getElementById(`icon-${id}`);
    if (!icon) return;
    icon.classList.replace("bi-clipboard", "bi-check-lg");
    icon.closest("button").classList.add("copied");
    setTimeout(() => {
      icon.classList.replace("bi-check-lg", "bi-clipboard");
      icon.closest("button").classList.remove("copied");
    }, 2000);
  },

  /* ── Toast notification ───────────────────────────────── */
  showToast(message) {
    const toastEl = document.getElementById("hh-toast");
    const toastBody = document.getElementById("hh-toast-body");
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(toastEl, { delay: 2500 });
    toast.show();
  },

  /* ── Formulaire de contact ───────────────────────────── */
  showFormSuccess() {
    document.getElementById("contact-form").reset();
    this.showToast("Votre message a bien été envoyé. Merci !");
  },

  showFormError(msg) {
    this.showToast(msg || "Une erreur est survenue. Veuillez réessayer.");
  },

  /* ── Navbar scroll ───────────────────────────────────── */
  setNavbarScrolled(scrolled) {
    const navbar = document.getElementById("main-navbar");
    if (scrolled) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  },
};

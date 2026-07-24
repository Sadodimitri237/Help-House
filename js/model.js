/**
 * MODEL — Help House
 * Source de vérité : toutes les données de l'application.
 */
const Model = {
  association: {
    nom: "Help House",
    slogan: "Votre générosité bâtit leur avenir.",
    description:
      "Help House est une association à but non lucratif basée au Cameroun. " +
      "Nous œuvrons chaque jour pour offrir aux orphelins un foyer chaleureux, " +
      "une éducation de qualité et un avenir porteur d'espoir. " +
      "Chaque geste de solidarité, qu'il soit financier ou en nature, " +
      "change concrètement la vie d'un enfant.",
    instagram: "https://www.instagram.com/help.house237?igsh=czlwYTk2OHQ1NWtk",
    email: "helphousecmr@gmail.com",
    logo: "assets/logo.png",
  },

  impact: [
    { valeur: "120+", libelle: "Orphelins accompagnés" },
    { valeur: "8",    libelle: "Années d'engagement" },
    { valeur: "340+", libelle: "Familles bénéficiaires" },
    { valeur: "15",   libelle: "Partenaires actifs" },
  ],

  mission: [
    {
      icone: "bi-house-heart-fill",
      titre: "Un foyer sûr",
      texte:
        "Nous assurons un hébergement sécurisé, propre et bienveillant à chaque enfant sous notre responsabilité.",
    },
    {
      icone: "bi-book-fill",
      titre: "Éducation & formation",
      texte:
        "Scolarisation, fournitures, suivi scolaire : nous investissons dans l'avenir intellectuel de chaque enfant.",
    },
    {
      icone: "bi-heart-pulse-fill",
      titre: "Santé & bien-être",
      texte:
        "Suivi médical régulier, nutrition équilibrée et soutien psychologique pour un développement harmonieux.",
    },
  ],

  donsFinanciers: [
    {
      id: "orange",
      operateur: "Orange Money",
      numero: "+237 695 61 46 14",
      couleur: "#FF6600",
      icone: "bi-phone-fill",
      instructions:
        "Ouvrez votre application Orange Money, sélectionnez « Transfert » et entrez le numéro ci-dessus.",
    },
    {
      id: "mtn",
      operateur: "MTN Mobile Money",
      numero: "+237 674 31 64 34",
      couleur: "#FFCC00",
      icone: "bi-phone-fill",
      instructions:
        "Composez *126# ou ouvrez l'application MTN MoMo, choisissez « Envoyer de l'argent » et saisissez le numéro.",
    },
    {
      id: "banque",
      operateur: "Virement bancaire",
      numero: null,
      couleur: "#2B4A6B",
      icone: "bi-bank2",
      lien: "https://revolut.me/genevievebrenda",
      instructions:
        "Effectuez votre virement sécurisé via notre plateforme bancaire partenaire PayTech.",
    },
  ],

  donsNature: {
    intro:
      "Vos dons en nature ont un impact direct et immédiat. " +
      "Nous acceptons tout ce qui peut améliorer le quotidien des enfants.",
    categories: [
      { icone: "bi-bag-fill",        libelle: "Vêtements & chaussures" },
      { icone: "bi-cup-hot-fill",    libelle: "Alimentation & denrées" },
      { icone: "bi-pencil-fill",     libelle: "Fournitures scolaires" },
      { icone: "bi-controller",      libelle: "Jouets & jeux éducatifs" },
      { icone: "bi-capsule",         libelle: "Médicaments & hygiène" },
      { icone: "bi-laptop-fill",     libelle: "Matériel informatique" },
    ],
  },
};

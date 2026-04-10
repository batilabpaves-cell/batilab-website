# BATILAB TECHNOLOGY — Site Web

Site officiel de **Société BATILAB SARL**, spécialiste des matériaux de construction haut de gamme à Ouagadougou, Burkina Faso.

---

## Structure du projet

```
/
├── index.html              ← Page d'accueil
├── favicon.svg             ← Icône du site (BL or sur fond noir)
├── netlify.toml            ← Configuration déploiement Netlify
├── css/
│   └── style.css           ← Tous les styles
├── js/
│   └── main.js             ← Tous les scripts
├── images/                 ← Vos photos (voir section ci-dessous)
└── pages/
    ├── produits.html       ← Catalogue détaillé (6 gammes)
    └── contact.html        ← Page contact + FAQ
```

---

## Déploiement sur Netlify (gratuit)

### Option 1 — Glisser-déposer (le plus simple)
1. Allez sur [app.netlify.com](https://app.netlify.com)
2. Créez un compte gratuit (email ou Google)
3. Faites glisser **le dossier entier** dans la zone de dépôt
4. Votre site est en ligne en 30 secondes sur une URL type `random-name.netlify.app`

### Option 2 — Via GitHub (mises à jour automatiques)
1. Créez un dépôt GitHub et poussez ce dossier
2. Sur Netlify → "New site from Git" → connectez votre dépôt
3. Chaque `git push` met à jour le site automatiquement

### Domaine personnalisé
Dans Netlify → Domain settings → "Add custom domain" → entrez `batilabtech.com`

---

## Configurer le formulaire de contact (Formspree)

1. Créez un compte gratuit sur [formspree.io](https://formspree.io)
2. Créez un nouveau formulaire → copiez votre **Form ID** (ex: `xabcdefg`)
3. Dans `index.html` (ligne ~230) et `pages/contact.html` (ligne ~70), remplacez :
   ```html
   <form class="contact-form" data-formspree="YOUR_FORM_ID"
   ```
   par :
   ```html
   <form class="contact-form" data-formspree="xabcdefg"
   ```
4. Les messages arriveront directement dans votre boîte email

---

## Ajouter vos photos

### Nommage recommandé
Déposez vos images dans le dossier `/images/` avec ces noms :

| Fichier | Usage |
|---------|-------|
| `og-image.jpg` | Partage Facebook/réseaux (1200×630px) |
| `about-batilab.jpg` | Section À propos (portrait ou équipe) |
| `gallery-1.jpg` à `gallery-12.jpg` | Galerie de réalisations |
| `pave3d-main.jpg` | Photo principale Pavé 3D |
| `pave3d-2.jpg`, `pave3d-3.jpg`, `pave3d-4.jpg` | Photos secondaires Pavé 3D |
| `parpaings-main.jpg`, etc. | Idem pour chaque produit |

### Activer une photo dans la galerie
Dans `index.html`, trouvez le bloc correspondant et remplacez le placeholder par :
```html
<!-- AVANT (placeholder) -->
<div class="gallery-item-placeholder">
  <span>◈</span>
  <p>Photo 1 — Pavé 3D villa</p>
</div>

<!-- APRÈS (vraie photo) -->
<img src="images/gallery-1.jpg" alt="Pavé 3D — Villa résidentielle Ouaga 2000" loading="lazy">
```

### Activer la photo "À propos"
Dans `index.html`, section `about-img-frame`, remplacez le bloc placeholder par :
```html
<img src="images/about-batilab.jpg" alt="Équipe BATILAB TECHNOLOGY" loading="lazy">
```

---

## Mettre à jour les informations

### Numéro WhatsApp
Rechercher et remplacer dans tous les fichiers :
- `22655511212` → votre numéro avec indicatif (sans +)

### Lien Facebook
Rechercher `facebook.com/batilabtech` → remplacez par votre vraie URL Facebook

### Adresse email dans Formspree
Se configure directement sur le tableau de bord [formspree.io](https://formspree.io)

### Témoignages clients
Dans `index.html`, section `#temoignages`, modifiez les blocs `.testimonial` avec les vrais noms, quartiers et projets de vos clients.

---

## Optimisation images recommandée

Avant d'uploader vos photos, redimensionnez-les :
- **Galerie** : 1200×800px maximum, format JPEG, qualité 80%
- **OG image** : exactement 1200×630px
- **À propos** : 800×1000px maximum

Outil gratuit en ligne : [squoosh.app](https://squoosh.app)

---

## Identité visuelle (ne pas modifier)

| Élément | Valeur |
|---------|--------|
| Couleur principale | `#0b0b07` (noir) |
| Couleur accent | `#c9a227` (or) |
| Police titres | Cormorant Garamond |
| Police texte | Jost |
| Tagline | "La passion de l'excellence" |

---

© 2025 Société BATILAB SARL — Ouagadougou, Burkina Faso

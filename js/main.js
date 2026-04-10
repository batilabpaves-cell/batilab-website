/* =========================================================
   BATILAB TECHNOLOGY — Scripts principaux
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navigation hamburger ──────────────────────────── */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Fermer au clic sur un lien
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Fermer avec Echap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── 2. Navbar scroll ─────────────────────────────────── */
  const nav = document.querySelector('nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('nav-scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 3. Lien actif selon la section visible ───────────── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              const href = link.getAttribute('href');
              const isActive = href === `#${id}` || href === `./#${id}`;
              link.classList.toggle('active', isActive);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(sec => sectionObserver.observe(sec));
  }

  /* ── 4. Compteurs animés ──────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num[data-target]');

  if (statNums.length) {
    const animateCounter = (el) => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1800;
      const start = performance.now();

      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        el.textContent = prefix + (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target + suffix;
      };
      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            animateCounter(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNums.forEach(el => counterObserver.observe(el));
  }

  /* ── 5. Révélation au scroll ──────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ── 6. Galerie + Lightbox ────────────────────────────── */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbCounter = document.getElementById('lightbox-counter');
  const lbClose = document.getElementById('lightbox-close');
  const lbPrev = document.getElementById('lightbox-prev');
  const lbNext = document.getElementById('lightbox-next');
  let currentIndex = 0;

  const galleryData = [];
  galleryItems.forEach((item, i) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');
    galleryData.push({
      src: img ? img.src : '',
      alt: img ? img.alt : '',
      caption: caption ? caption.textContent : ''
    });
    item.addEventListener('click', () => openLightbox(i));
  });

  function openLightbox(index) {
    if (!lightbox || !galleryData.length) return;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function updateLightbox() {
    const data = galleryData[currentIndex];
    if (!data || !lbImg) return;
    lbImg.src = data.src;
    lbImg.alt = data.alt;
    if (lbCaption) lbCaption.textContent = data.caption;
    if (lbCounter) lbCounter.textContent = `${currentIndex + 1} / ${galleryData.length}`;
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  if (lbPrev) lbPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateLightbox();
  });
  if (lbNext) lbNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
    if (e.key === 'ArrowRight' && lbNext) lbNext.click();
  });

  /* ── 7. Carrousel témoignages ─────────────────────────── */
  const track = document.getElementById('testimonials-track');
  const dots = document.querySelectorAll('.testimonial-dot');
  const btnPrev = document.getElementById('testimonial-prev');
  const btnNext = document.getElementById('testimonial-next');
  const testimonialCount = track ? track.children.length : 0;
  let currentSlide = 0;
  let autoplayTimer = null;

  function goToSlide(index) {
    if (!track) return;
    currentSlide = (index + testimonialCount) % testimonialCount;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), 5500);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  if (track && testimonialCount > 1) {
    goToSlide(0);
    startAutoplay();
    if (btnPrev) btnPrev.addEventListener('click', () => { goToSlide(currentSlide - 1); startAutoplay(); });
    if (btnNext) btnNext.addEventListener('click', () => { goToSlide(currentSlide + 1); startAutoplay(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); startAutoplay(); }));

    // Pause on hover
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
  }

  /* ── 8. Validation formulaire en temps réel ───────────── */
  const forms = document.querySelectorAll('.contact-form');

  forms.forEach(form => {
    const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');

    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) validateField(input);
      });
    });

    form.addEventListener('submit', (e) => handleFormSubmit(e, form));
  });

  function validateField(field) {
    const group = field.closest('.form-group');
    const errorEl = group ? group.querySelector('.form-error') : null;
    let error = '';

    if (field.required && !field.value.trim()) {
      error = 'Ce champ est obligatoire.';
    } else if (field.type === 'tel' && field.value.trim()) {
      const cleaned = field.value.replace(/\s/g, '');
      if (!/^\+?[\d]{8,15}$/.test(cleaned)) {
        error = 'Numéro de téléphone invalide.';
      }
    } else if (field.type === 'email' && field.value.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        error = 'Adresse email invalide.';
      }
    }

    field.classList.toggle('error', !!error);
    field.classList.toggle('valid', !error && !!field.value.trim());
    if (errorEl) {
      errorEl.textContent = error;
      errorEl.classList.toggle('visible', !!error);
    }
    return !error;
  }

  function validateForm(form) {
    const fields = form.querySelectorAll('.form-input[required], .form-textarea[required], .form-select[required]');
    let valid = true;
    fields.forEach(f => { if (!validateField(f)) valid = false; });
    return valid;
  }

  /* ── 9. Soumission Formspree ──────────────────────────── */
  async function handleFormSubmit(e, form) {
    e.preventDefault();
    if (!validateForm(form)) return;

    const btn = form.querySelector('.form-submit');
    const notice = form.querySelector('.form-notice');
    const formspreeId = form.dataset.formspree;

    if (!formspreeId || formspreeId === 'YOUR_FORM_ID') {
      // Mode démo (sans Formspree configuré)
      showNotice(notice, 'success', '✓ Merci ! Votre message a bien été envoyé. Nous vous recontactons sous 24h.');
      form.reset();
      form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(f => {
        f.classList.remove('valid', 'error');
      });
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Envoi en cours…';

    try {
      const data = new FormData(form);
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        showNotice(notice, 'success', '✓ Merci ! Votre message a bien été envoyé. Nous vous recontactons sous 24h.');
        form.reset();
        form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(f => {
          f.classList.remove('valid', 'error');
        });
      } else {
        throw new Error('Erreur serveur');
      }
    } catch {
      showNotice(notice, 'error-msg', '✗ Une erreur s\'est produite. Veuillez réessayer ou nous contacter par WhatsApp.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Envoyer ma demande →';
    }
  }

  function showNotice(el, type, message) {
    if (!el) return;
    el.className = `form-notice ${type}`;
    el.textContent = message;
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => { el.className = 'form-notice'; el.textContent = ''; }, 8000);
  }

  /* ── 10. FAQ accordéon ────────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── 11. Lazy loading images ──────────────────────────── */
  const lazyImgs = document.querySelectorAll('img[data-src]');
  if (lazyImgs.length) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          lazyObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });
    lazyImgs.forEach(img => lazyObserver.observe(img));
  }

});

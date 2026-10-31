document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDynamicConfig();
  initWeddingSide();
  initCountdown();
  initMusicPlayer();
  initGalleryLightbox();
  initSaveDateCarousel();
  initRSVPForm();
  initGiftModal();
  initThemeSwitcher();
  initScrollAnimations();
  if (typeof initSakuraEffect === 'function') {
    initSakuraEffect();
  }
});

function getWeddingSide() {
  if (window.__WEDDING_SIDE) return window.__WEDDING_SIDE;

  const path = window.location.pathname.toLowerCase();
  const pathSegments = path.split('/').filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1] || '';

  if (lastSegment === 'bride' || lastSegment === 'bride.html' || path.includes('/bride/')) {
    return 'bride';
  }
  if (lastSegment === 'groom' || lastSegment === 'groom.html' || path.includes('/groom/')) {
    return 'groom';
  }

  return 'groom';
}

function initWeddingSide() {
  const side = getWeddingSide();
  document.documentElement.setAttribute('data-side', side);

  const cfg = typeof WEDDING_CONFIG !== 'undefined' ? WEDDING_CONFIG : {};
  const groomName = (cfg.groom && cfg.groom.name) ? cfg.groom.name : 'Đức Hoà';
  const brideName = (cfg.bride && cfg.bride.name) ? cfg.bride.name : 'Khánh Huyền';

  const thankYouCouple = document.getElementById('thank-you-couple');

  if (side === 'bride') {
    document.title = `Thiệp Cưới | ${brideName} & ${groomName}`;

    if (thankYouCouple) {
      thankYouCouple.textContent = `${brideName.toUpperCase()} & ${groomName.toUpperCase()}`;
    }

    const colGroom = document.querySelector('#couple .col-groom');
    const colBride = document.querySelector('#couple .col-bride');
    const coupleHeading = document.querySelector('#couple .couple-heading');

    if (colGroom && colBride && coupleHeading) {
      colGroom.insertBefore(coupleHeading, colGroom.firstChild);

      colBride.classList.remove('reveal-right', 'delay-2');
      colBride.classList.add('reveal-left', 'delay-1');

      colGroom.classList.remove('reveal-left', 'delay-1');
      colGroom.classList.add('reveal-right', 'delay-2');
    }

    const venueGroom = document.querySelector('#invitation .venue-col-groom');
    const venueBride = document.querySelector('#invitation .venue-col-bride');
    if (venueGroom && venueBride) {
      venueBride.classList.remove('reveal-right');
      venueBride.classList.add('reveal-left');

      venueGroom.classList.remove('reveal-left');
      venueGroom.classList.add('reveal-right');
    }
  } else {
    document.title = `Thiệp Cưới | ${groomName} & ${brideName}`;
    if (thankYouCouple) {
      thankYouCouple.textContent = `${groomName.toUpperCase()} & ${brideName.toUpperCase()}`;
    }
  }
}

function initDynamicConfig() {
  if (typeof WEDDING_CONFIG === 'undefined') return;

  const cfg = WEDDING_CONFIG;

  if (new URLSearchParams(window.location.search).get('day') === 'sunday') {
    const sundayDateText = '9:30 | CHỦ NHẬT | 29.11.2026';
    if (cfg.dateDisplay) cfg.dateDisplay.fullDateText = sundayDateText;
    if (cfg.venueBride) cfg.venueBride.time = sundayDateText;
    if (cfg.venueGroom) cfg.venueGroom.time = sundayDateText;
    if (cfg.venue) cfg.venue.time = sundayDateText;
    if (cfg.timeline) {
        cfg.timeline[0].time = "9:00";
        cfg.timeline[1].time = "9:30";
        cfg.timeline[2].time = "12:00";
    }
  }

  if (cfg.groom) {
    const heroGroom = document.getElementById('hero-groom-name');
    if (heroGroom && cfg.groom.name) {
      heroGroom.innerHTML = cfg.groom.name.replace(/\s+/g, '<br>');
    }
    const heroBottomGroom = document.getElementById('hero-bottom-groom');
    if (heroBottomGroom && cfg.groom.name) {
      heroBottomGroom.textContent = cfg.groom.name;
    }
    const coupleGroom = document.getElementById('couple-groom-name');
    if (coupleGroom && cfg.groom.name) {
      coupleGroom.textContent = cfg.groom.name.toUpperCase();
    }
    const rsvpGroom = document.getElementById('rsvp-opt-groom');
    if (rsvpGroom && cfg.groom.name) {
      rsvpGroom.textContent = `Khách mời của Chú rể (${cfg.groom.name})`;
    }
    if (cfg.groom.parents) {
      const gFather = document.getElementById('parent-groom-father');
      if (gFather && cfg.groom.parents.father) gFather.textContent = cfg.groom.parents.father;
      const gMother = document.getElementById('parent-groom-mother');
      if (gMother && cfg.groom.parents.mother) gMother.textContent = cfg.groom.parents.mother;
    }
  }

  if (cfg.bride) {
    const heroBride = document.getElementById('hero-bride-name');
    if (heroBride && cfg.bride.name) {
      heroBride.innerHTML = cfg.bride.name.replace(/\s+/g, '<br>');
    }
    const heroBottomBride = document.getElementById('hero-bottom-bride');
    if (heroBottomBride && cfg.bride.name) {
      heroBottomBride.textContent = cfg.bride.name;
    }
    const coupleBride = document.getElementById('couple-bride-name');
    if (coupleBride && cfg.bride.name) {
      coupleBride.textContent = cfg.bride.name.toUpperCase();
    }
    const rsvpBride = document.getElementById('rsvp-opt-bride');
    if (rsvpBride && cfg.bride.name) {
      rsvpBride.textContent = `Khách mời của Cô dâu (${cfg.bride.name})`;
    }
    if (cfg.bride.parents) {
      const bFather = document.getElementById('parent-bride-father');
      if (bFather && cfg.bride.parents.father) bFather.textContent = cfg.bride.parents.father;
      const bMother = document.getElementById('parent-bride-mother');
      if (bMother && cfg.bride.parents.mother) bMother.textContent = cfg.bride.parents.mother;
    }
  }

  if (cfg.dateDisplay) {
    const d = cfg.dateDisplay;
    const heroBottomDate = document.getElementById('hero-bottom-date');
    if (heroBottomDate && d.day && d.month && d.year) {
      heroBottomDate.textContent = `${d.day} . ${d.month} . ${d.year}`;
    }

    const heroDay = document.getElementById('hero-diamond-day');
    if (heroDay && d.day) heroDay.textContent = d.day;
    const heroMonth = document.getElementById('hero-diamond-month');
    if (heroMonth && d.month) heroMonth.textContent = d.month;
    const heroYear = document.getElementById('hero-diamond-year');
    if (heroYear && d.shortYear) heroYear.textContent = d.shortYear;

    const stdDay = document.getElementById('std-cal-day');
    if (stdDay && d.day) stdDay.textContent = d.day;
    const stdMonth = document.getElementById('std-cal-month');
    if (stdMonth && d.month) stdMonth.textContent = d.month;
    const stdYear = document.getElementById('std-cal-year');
    if (stdYear && d.year) stdYear.textContent = d.year;

    const invDate = document.getElementById('invitation-datetime');
    if (invDate && d.fullDateText) invDate.textContent = d.fullDateText;
  }

  const brideVenue = cfg.venueBride || cfg.venue;
  if (brideVenue) {
    const venueBrideName = document.getElementById('invitation-bride-venue-name');
    if (venueBrideName && brideVenue.name) venueBrideName.textContent = brideVenue.name;

    const venueBrideAddr = document.getElementById('invitation-bride-venue-address');
    if (venueBrideAddr && brideVenue.address) {
      const addr = brideVenue.address.trim();
      venueBrideAddr.textContent = addr.startsWith('(') ? addr : `(${addr})`;
    }

    const venueBrideDate = document.getElementById('invitation-bride-datetime');
    if (venueBrideDate) {
      const timeText = brideVenue.time || (cfg.dateDisplay && cfg.dateDisplay.fullDateText);
      if (timeText) venueBrideDate.textContent = timeText;
    }

    const mapBrideBtn = document.getElementById('invitation-bride-map-btn');
    if (mapBrideBtn && brideVenue.mapUrl) mapBrideBtn.href = brideVenue.mapUrl;
  }

  const groomVenue = cfg.venueGroom || cfg.venue;
  if (groomVenue) {
    const venueGroomName = document.getElementById('invitation-groom-venue-name') || document.getElementById('invitation-venue-name');
    if (venueGroomName && groomVenue.name) venueGroomName.textContent = groomVenue.name;

    const venueGroomAddr = document.getElementById('invitation-groom-venue-address') || document.getElementById('invitation-venue-address');
    if (venueGroomAddr && groomVenue.address) {
      const addr = groomVenue.address.trim();
      venueGroomAddr.textContent = addr.startsWith('(') ? addr : `(${addr})`;
    }

    const venueGroomDate = document.getElementById('invitation-groom-datetime') || document.getElementById('invitation-datetime');
    if (venueGroomDate) {
      const timeText = groomVenue.time || (cfg.dateDisplay && cfg.dateDisplay.fullDateText);
      if (timeText) venueGroomDate.textContent = timeText;
    }

    const mapGroomBtn = document.getElementById('invitation-groom-map-btn') || document.getElementById('invitation-map-btn');
    if (mapGroomBtn && groomVenue.mapUrl) mapGroomBtn.href = groomVenue.mapUrl;
  }

  if (Array.isArray(cfg.timeline) && cfg.timeline.length > 0) {
    const timelineContainer = document.getElementById('timeline-items');
    if (timelineContainer) {
      const iconMap = {
        camera: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
        ring: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="14" r="7"/><path d="M9 7l3-4 3 4"/><circle cx="12" cy="4" r="1" fill="currentColor"/></svg>',
        dining: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 2v20M21 2v4a3 3 0 0 1-3 3M3 2v7a4 4 0 0 0 4 4v9M7 2v7M5 2v7"/></svg>',
        music: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 18V5l12-2v13M9 9l12-2"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>'
      };

      timelineContainer.innerHTML = cfg.timeline.map((item, idx) => {
        const svg = iconMap[item.icon] || iconMap.ring;
        const delayClass = `delay-${(idx % 4) + 1}`;
        let titleHtml = item.title;
        if (!titleHtml.includes('<br>') && titleHtml.includes(' ')) {
          const words = titleHtml.split(' ');
          if (words.length >= 3) {
            titleHtml = words.slice(0, 2).join(' ') + '<br>' + words.slice(2).join(' ');
          } else if (words.length === 2) {
            titleHtml = words[0] + '<br>' + words[1];
          }
        }
        return `
          <div class="timeline-node reveal-on-scroll reveal-up ${delayClass}">
            <div class="timeline-icon-wrap">${svg}</div>
            <div class="timeline-time">${item.time}</div>
            <div class="timeline-title">${titleHtml}</div>
          </div>
        `;
      }).join('');
    }
  }

  if (cfg.images) {
    const heroImg = document.getElementById('hero-img');
    if (heroImg && cfg.images.hero) heroImg.src = cfg.images.hero;

    for (let i = 1; i <= 9; i++) {
      const sd = document.getElementById(`save-date-img-${i}`);
      const src = cfg.images[`saveDate${i}`];
      if (sd && src) sd.src = src;
    }

    const cGroom = document.getElementById('couple-groom-img');
    if (cGroom && cfg.images.coupleGroom) cGroom.src = cfg.images.coupleGroom;
    const cBride = document.getElementById('couple-bride-img');
    if (cBride && cfg.images.coupleBride) cBride.src = cfg.images.coupleBride;

    const storyImg = document.getElementById('story-banner-img');
    if (storyImg && cfg.images.storyBanner) storyImg.src = cfg.images.storyBanner;

    const thankImg = document.getElementById('thank-you-img');
    if (thankImg && cfg.images.thankYou) thankImg.src = cfg.images.thankYou;

    if (Array.isArray(cfg.images.gallery)) {
      cfg.images.gallery.forEach((url, i) => {
        const gImg = document.getElementById(`gallery-img-${i + 1}`);
        if (gImg && url) gImg.src = url;
      });
    }
  }

  if (cfg.giftBox) {
    const giftSection = document.getElementById('gift-section');
    if (giftSection && cfg.giftBox.enable === false) {
      giftSection.style.display = 'none';
    }

    if (cfg.giftBox.groomBank) {
      const gb = cfg.giftBox.groomBank;
      const gBank = document.getElementById('gift-groom-bank');
      if (gBank && gb.bankName) gBank.textContent = gb.bankName;
      const gAcc = document.getElementById('gift-groom-acc');
      if (gAcc && gb.accountNumber) gAcc.textContent = gb.accountNumber;
      const gName = document.getElementById('gift-groom-name');
      if (gName && gb.accountName) gName.textContent = gb.accountName;
      const gQr = document.getElementById('gift-groom-qr');
      if (gQr && gb.qrImage) gQr.src = gb.qrImage;
    }

    if (cfg.giftBox.brideBank) {
      const bb = cfg.giftBox.brideBank;
      const bBank = document.getElementById('gift-bride-bank');
      if (bBank && bb.bankName) bBank.textContent = bb.bankName;
      const bAcc = document.getElementById('gift-bride-acc');
      if (bAcc && bb.accountNumber) bAcc.textContent = bb.accountNumber;
      const bName = document.getElementById('gift-bride-name');
      if (bName && bb.accountName) bName.textContent = bb.accountName;
      const bQr = document.getElementById('gift-bride-qr');
      if (bQr && bb.qrImage) bQr.src = bb.qrImage;
    }
  }

  if (cfg.music) {
    const musicBtn = document.getElementById('floating-music-btn');
    if (musicBtn && cfg.music.enable === false) {
      musicBtn.style.display = 'none';
    }
  }
}

function initTheme() {

  const savedTheme = localStorage.getItem('wedding_active_theme');
  const activeTheme = savedTheme || WEDDING_CONFIG.theme || 'green';
  applyTheme(activeTheme);
}

function applyTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('wedding_active_theme', themeName);

  document.querySelectorAll('.theme-opt-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === themeName);
  });
}

function initCountdown() {
  const targetDate = new Date(WEDDING_CONFIG.weddingDate).getTime();
  const elDays = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMinutes = document.getElementById('cd-minutes');
  const elSeconds = document.getElementById('cd-seconds');

  if (!elDays || !elHours || !elMinutes || !elSeconds) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      elDays.textContent = '00';
      elHours.textContent = '00';
      elMinutes.textContent = '00';
      elSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    elDays.textContent = String(days).padStart(2, '0');
    elHours.textContent = String(hours).padStart(2, '0');
    elMinutes.textContent = String(minutes).padStart(2, '0');
    elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

function initMusicPlayer() {
  const musicBtn = document.getElementById('floating-music-btn');
  const audio = document.getElementById('bg-audio');

  if (!musicBtn || !audio) return;

  if (WEDDING_CONFIG.music && WEDDING_CONFIG.music.audioSrc) {
    audio.src = WEDDING_CONFIG.music.audioSrc;
  }

  let isPlaying = false;

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
      musicBtn.classList.remove('playing');
      musicBtn.title = "Bật nhạc cưới";
      isPlaying = false;
    } else {
      audio.play().then(() => {
        musicBtn.classList.add('playing');
        musicBtn.title = "Tắt nhạc cưới";
        isPlaying = true;
      }).catch(err => {
        console.log("Autoplay bị chặn bởi trình duyệt:", err);
      });
    }
  }

  musicBtn.addEventListener('click', togglePlay);

  const handleFirstInteraction = () => {
    if (!isPlaying) {
      audio.play().then(() => {
        musicBtn.classList.add('playing');
        isPlaying = true;
      }).catch(() => {});
    }
    document.removeEventListener('click', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
  };

  document.addEventListener('click', handleFirstInteraction, { once: true });
  document.addEventListener('touchstart', handleFirstInteraction, { once: true });
}

function initSaveDateCarousel() {
  const carousel = document.getElementById('std-carousel');
  const track = document.getElementById('std-track');
  const thumbsWrap = document.getElementById('std-thumbs');
  if (!carousel || !track) return;

  const slides = Array.from(track.querySelectorAll('.std-slide'));
  const total = slides.length;
  if (!total) return;

  const makeClone = slide => {
    const clone = slide.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    const origImgs = slide.querySelectorAll('img');
    const cloneImgs = clone.querySelectorAll('img');
    origImgs.forEach((origImg, idx) => {
      const cloneImg = cloneImgs[idx];
      if (cloneImg) {
        const compPos = window.getComputedStyle(origImg).objectPosition;
        if (compPos && compPos !== '50% 50%') {
          cloneImg.style.objectPosition = compPos;
        }
      }
    });
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    clone.querySelectorAll('img').forEach(img => img.removeAttribute('loading'));
    return clone;
  };
  if (total > 1) {
    track.insertBefore(makeClone(slides[total - 1]), slides[0]);
    track.appendChild(makeClone(slides[0]));
  }
  const offset = total > 1 ? 1 : 0;
  const lastPos = total - 1 + offset * 2;

  let current = 0;
  let timer = null;
  let inView = false;
  let paused = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const thumbs = slides.map((slide, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'std-thumb';
    btn.setAttribute('aria-label', `Ảnh ${i + 1}`);
    const img = document.createElement('img');
    img.src = slide.querySelector('img').src;
    img.alt = '';
    img.loading = 'lazy';
    btn.appendChild(img);
    btn.addEventListener('click', () => {
      scrollToPos(i + offset);
      restart();
    });
    if (thumbsWrap) thumbsWrap.appendChild(btn);
    return btn;
  });

  const currentPos = () => Math.round(track.scrollLeft / track.clientWidth);
  const realIndex = pos => (pos - offset + total) % total;

  function jumpTo(pos) {
    track.style.scrollSnapType = 'none';
    track.scrollTo({ left: pos * track.clientWidth, behavior: 'instant' });
    requestAnimationFrame(() => { track.style.scrollSnapType = ''; });
  }

  function normalize() {
    if (!offset) return;
    const pos = currentPos();
    if (pos <= 0) jumpTo(total);
    else if (pos >= lastPos) jumpTo(offset);
  }

  function scrollToPos(pos) {
    normalize();
    const target = Math.max(0, Math.min(lastPos, pos));
    track.scrollTo({
      left: target * track.clientWidth,
      behavior: reduceMotion ? 'auto' : 'smooth'
    });
  }

  function step(dir) {
    normalize();
    scrollToPos(currentPos() + dir);
  }

  function setActive(index) {
    current = index;
    thumbs.forEach((t, i) => t.classList.toggle('is-active', i === index));
    const thumb = thumbs[index];
    if (thumbsWrap && thumb) {
      thumbsWrap.scrollTo({
        left: thumb.offsetLeft - (thumbsWrap.clientWidth - thumb.offsetWidth) / 2,
        behavior: reduceMotion ? 'auto' : 'smooth'
      });
    }
  }

  let rafId = null;
  let settleTimer = null;
  track.addEventListener('scroll', () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const index = realIndex(currentPos());
      if (index !== current) setActive(index);
    });
    clearTimeout(settleTimer);
    settleTimer = setTimeout(normalize, 150);
  }, { passive: true });

  const prevBtn = document.getElementById('std-prev');
  const nextBtn = document.getElementById('std-next');
  if (prevBtn) prevBtn.addEventListener('click', () => { step(-1); restart(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { step(1); restart(); });

  window.addEventListener('resize', () => jumpTo(current + offset));

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  function start() {
    stop();
    if (reduceMotion || paused || !inView) return;
    timer = setInterval(() => step(1), 4000);
  }

  function restart() {
    if (timer) start();
  }

  carousel.addEventListener('mouseenter', () => { paused = true; stop(); });
  carousel.addEventListener('mouseleave', () => { paused = false; start(); });
  carousel.addEventListener('touchstart', () => { paused = true; stop(); }, { passive: true });
  carousel.addEventListener('touchend', () => {
    paused = false;
    setTimeout(start, 1500);
  }, { passive: true });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      inView ? start() : stop();
    }, { threshold: 0.4 }).observe(carousel);
  }

  jumpTo(offset);
  setActive(0);
}

function initGalleryLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightbox || !lightboxImg) return;

  const targetImgs = document.querySelectorAll('.gallery-item img, .couple-photo-box img, .couple-photo-item img, .save-date-item img, .hero-card-img, .story-card-img, .thank-you-img');
  targetImgs.forEach(img => {

    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeLightbox();
    });
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

function initRSVPForm() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  const submitBtn = document.getElementById('rsvp-submit') || form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const wishes = form.querySelector('[name="wishes"]').value.trim();
    const attendanceVal = form.querySelector('[name="attendance"]').value;
    const plusOne = form.querySelector('[name="plus_one"]').value.trim();
    const guestOfVal = form.querySelector('[name="guest_of"]').value;

    if (!name) {
      showToast('Vui lòng nhập tên của bạn nhé!');
      return;
    }

    const attendanceText = attendanceVal === 'yes' ? 'Chắc chắn tham dự' : 'Không thể tham dự';
    let guestOfText = 'Bạn chung cả hai';
    if (guestOfVal === 'groom') {
      guestOfText = (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.groom && WEDDING_CONFIG.groom.name)
        ? `Khách Chú rể (${WEDDING_CONFIG.groom.name})`
        : 'Khách Chú rể';
    } else if (guestOfVal === 'bride') {
      guestOfText = (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.bride && WEDDING_CONFIG.bride.name)
        ? `Khách Cô dâu (${WEDDING_CONFIG.bride.name})`
        : 'Khách Cô dâu';
    }

    const payload = {
      name: name,
      wishes: wishes,
      attendance: attendanceText,
      plus_one: plusOne || 'Không có',
      guest_of: guestOfText
    };

    const scriptUrl = (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.rsvp && WEDDING_CONFIG.rsvp.googleSheetScriptUrl)
      ? WEDDING_CONFIG.rsvp.googleSheetScriptUrl.trim()
      : '';

    const originalBtnText = submitBtn ? submitBtn.textContent : 'XÁC NHẬN';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Đang gửi...';
    }

    try {
      if (scriptUrl) {

        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }
      showToast(`Cảm ơn ${name}! Xác nhận của bạn đã được gửi thành công ❤️`);
      form.reset();
    } catch (err) {
      console.error('Lỗi khi gửi RSVP:', err);

      showToast(`Cảm ơn ${name}! Xác nhận của bạn đã được gửi thành công ❤️`);
      form.reset();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
}

function initGiftModal() {
  const giftBtn = document.getElementById('btn-open-gift');
  const giftModal = document.getElementById('gift-modal');
  const giftClose = document.getElementById('gift-modal-close');
  const tabGroom = document.getElementById('tab-groom');
  const tabBride = document.getElementById('tab-bride');
  const giftGroomContent = document.getElementById('gift-groom-content');
  const giftBrideContent = document.getElementById('gift-bride-content');

  if (!giftModal || !giftBtn) return;

  function closeGiftModal() {
    giftModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  giftBtn.addEventListener('click', () => {
    giftModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  if (giftClose) {
    giftClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeGiftModal();
    });
  }

  giftModal.addEventListener('click', (e) => {
    if (e.target === giftModal) closeGiftModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && giftModal.classList.contains('active')) {
      closeGiftModal();
    }
  });

  if (tabGroom && tabBride && giftGroomContent && giftBrideContent) {
    tabGroom.addEventListener('click', () => {
      tabGroom.classList.add('active');
      tabBride.classList.remove('active');
      giftGroomContent.style.display = 'block';
      giftBrideContent.style.display = 'none';
    });

    tabBride.addEventListener('click', () => {
      tabBride.classList.add('active');
      tabGroom.classList.remove('active');
      giftBrideContent.style.display = 'block';
      giftGroomContent.style.display = 'none';
    });
  }
}

function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const popup = document.getElementById('theme-palette-popup');

  if (!toggleBtn || !popup) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!popup.contains(e.target) && e.target !== toggleBtn) {
      popup.classList.remove('active');
    }
  });

  document.querySelectorAll('.theme-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      const themeNames = {
        'green': 'Xanh Rêu Ô Liu (Theo mẫu)',
        'gold': 'Vàng Ánh Kim (Luxury Champagne)',
        'red': 'Đỏ Truyền Thống Á Đông',
        'pink': 'Hồng Pastel Lãng Mạn',
        'navy': 'Xanh Navy Hoàng Gia'
      };
      showToast(`Đã chuyển theme: ${themeNames[theme] || theme}`);
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.reveal-on-scroll');
  if (!animatedElements.length) return;

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.12
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));
  } else {

    animatedElements.forEach(el => el.classList.add('is-visible'));
  }
}

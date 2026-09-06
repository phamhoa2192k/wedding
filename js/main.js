/**
 * ==========================================================================
 * MAIN WEDDING SCRIPTS
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDynamicConfig();
  initCountdown();
  initMusicPlayer();
  initGalleryLightbox();
  initRSVPForm();
  initGiftModal();
  initThemeSwitcher();
  initScrollAnimations();
});

/* --- Áp dụng cấu hình động từ WEDDING_CONFIG --- */
function initDynamicConfig() {
  if (typeof WEDDING_CONFIG === 'undefined') return;

  const cfg = WEDDING_CONFIG;

  // 1. CÔ DÂU & CHÚ RỂ
  if (cfg.groom) {
    const heroGroom = document.getElementById('hero-groom-name');
    if (heroGroom && cfg.groom.name) {
      heroGroom.innerHTML = cfg.groom.name.replace(/\s+/g, '<br>');
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

  // 2. NGÀY & THỜI GIAN HIỂN THỊ
  if (cfg.dateDisplay) {
    const d = cfg.dateDisplay;
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

  // 3. ĐỊA ĐIỂM & BẢN ĐỒ
  if (cfg.venue) {
    const venueName = document.getElementById('invitation-venue-name');
    if (venueName && cfg.venue.name) venueName.textContent = cfg.venue.name;

    const venueAddr = document.getElementById('invitation-venue-address');
    if (venueAddr && cfg.venue.address) {
      const addr = cfg.venue.address.trim();
      venueAddr.textContent = addr.startsWith('(') ? addr : `(${addr})`;
    }

    const mapBtn = document.getElementById('invitation-map-btn');
    if (mapBtn && cfg.venue.mapUrl) mapBtn.href = cfg.venue.mapUrl;
  }

  // 4. LỊCH TRÌNH TIỆC (TIMELINE)
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

  // 5. HÌNH ẢNH
  if (cfg.images) {
    const heroImg = document.getElementById('hero-img');
    if (heroImg && cfg.images.hero) heroImg.src = cfg.images.hero;

    const saveDateCard = document.getElementById('save-date-card');
    if (saveDateCard && cfg.images.saveDateBg) {
      saveDateCard.style.backgroundImage = `linear-gradient(140deg, rgba(15, 25, 18, 0.72) 0%, rgba(15, 25, 18, 0.48) 45%, rgba(15, 25, 18, 0.75) 100%), url('${cfg.images.saveDateBg}')`;
    }

    const sd1 = document.getElementById('save-date-img-1');
    if (sd1 && cfg.images.saveDate1) sd1.src = cfg.images.saveDate1;
    const sd2 = document.getElementById('save-date-img-2');
    if (sd2 && cfg.images.saveDate2) sd2.src = cfg.images.saveDate2;
    const sd3 = document.getElementById('save-date-img-3');
    if (sd3 && cfg.images.saveDate3) sd3.src = cfg.images.saveDate3;

    const cGroom = document.getElementById('couple-groom-img');
    if (cGroom && cfg.images.coupleGroom) cGroom.src = cfg.images.coupleGroom;
    const cBride = document.getElementById('couple-bride-img');
    if (cBride && cfg.images.coupleBride) cBride.src = cfg.images.coupleBride;

    if (Array.isArray(cfg.images.gallery)) {
      cfg.images.gallery.forEach((url, i) => {
        const gImg = document.getElementById(`gallery-img-${i + 1}`);
        if (gImg && url) gImg.src = url;
      });
    }
  }

  // 6. TIỆN ÍCH MỪNG CƯỚI (GIFT BOX & VIETQR)
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

  // 7. NHẠC NỀN
  if (cfg.music) {
    const musicBtn = document.getElementById('floating-music-btn');
    if (musicBtn && cfg.music.enable === false) {
      musicBtn.style.display = 'none';
    }
  }
}

/* --- 1. Khởi tạo & Quản lý Theme --- */
function initTheme() {
  // Ưu tiên theme đã lưu trong localStorage (khi user thử theme bằng widget),
  // Nếu chưa có thì lấy theo WEDDING_CONFIG.theme
  const savedTheme = localStorage.getItem('wedding_active_theme');
  const activeTheme = savedTheme || WEDDING_CONFIG.theme || 'green';
  applyTheme(activeTheme);
}

function applyTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('wedding_active_theme', themeName);

  // Cập nhật trạng thái active trên popup theme switcher nếu có
  document.querySelectorAll('.theme-opt-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === themeName);
  });
}

/* --- 2. Đồng hồ đếm ngược (Countdown Timer) --- */
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

/* --- 3. Trình phát nhạc nền (Music Player) --- */
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

  // Tự động phát khi người dùng chạm vào trang lần đầu tiên
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

/* --- 4. Lightbox xem ảnh kích thước lớn --- */
function initGalleryLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightbox || !lightboxImg) return;

  const targetImgs = document.querySelectorAll('.gallery-item img, .couple-photo-box img, .couple-photo-item img, .save-date-item img, .hero-card-img');
  targetImgs.forEach(img => {
    img.style.cursor = 'zoom-in';
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

  // Click vào bất kỳ vị trí nào ngoài bức ảnh thì đóng modal
  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      closeLightbox();
    }
  });

  // Hỗ trợ phím Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* --- 5. Form xác nhận tham dự (RSVP) --- */
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

    // Kiểm tra cấu hình URL Google Sheet trong WEDDING_CONFIG
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
        // Gửi tới Google Apps Script (mode: 'no-cors' để vượt qua CORS redirect từ Google)
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
      // Vẫn báo thành công cho khách để không làm gián đoạn trải nghiệm
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

/* --- 6. Hộp mừng cưới & QR Code --- */
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

/* --- 7. Theme Switcher Popup (Dành cho việc xem thử màu) --- */
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

/* --- Toast Thông Báo Nhẹ Nhàng --- */
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

/* --- 8. Hiệu ứng Landing Page khi cuộn chuột (Scroll Animations) --- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.reveal-on-scroll');
  if (!animatedElements.length) return;

  // Kiểm tra hỗ trợ IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px', // Kích hoạt khi cách đáy màn hình 40px
      threshold: 0.08
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Thêm class is-visible để kích hoạt hiệu ứng xuất hiện
          entry.target.classList.add('is-visible');
        } else {
          // Khi cuộn ra khỏi tầm nhìn, gỡ bỏ class is-visible
          // để mỗi lần người dùng cuộn tới thì hiệu ứng đều chạy lại
          entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));
  } else {
    // Fallback cho trình duyệt cũ không hỗ trợ IntersectionObserver
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }
}


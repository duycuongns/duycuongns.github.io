/**
 * Main JavaScript for Nguyen Duy Cuong Website
 * Interactive effects, Scroll Reveal, Course Syllabus switcher, and Form handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // 2. Interactive Course Syllabus Switcher (on khoa-hoc.html)
  const courseTabs = document.querySelectorAll('[data-course-tab]');
  const coursePanels = document.querySelectorAll('.course-detail-panel');

  function switchCourseTab(tabKey, shouldScroll = false) {
    if (!tabKey) return;
    tabKey = tabKey.toLowerCase().replace('#', '');

    // Normalize keys
    if (tabKey.includes('word')) tabKey = 'word';
    else if (tabKey.includes('excel')) tabKey = 'excel';
    else if (tabKey.includes('ppt') || tabKey.includes('powerpoint')) tabKey = 'ppt';

    // Update Ribbon Tab buttons
    courseTabs.forEach((tab) => {
      const target = tab.getAttribute('data-course-tab');
      if (target === tabKey) {
        tab.classList.add('is-active');
      } else {
        tab.classList.remove('is-active');
      }
    });

    // Update Detailed Syllabus Panels
    coursePanels.forEach((panel) => {
      if (panel.id === `detail-${tabKey}`) {
        panel.classList.add('is-active');
      } else {
        panel.classList.remove('is-active');
      }
    });

    // Update URL hash without jumping abruptly
    if (history.pushState) {
      history.pushState(null, null, `#${tabKey}`);
    }

    if (shouldScroll) {
      const detailsSection = document.getElementById('course-details-section');
      if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  if (courseTabs.length > 0) {
    courseTabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const tabKey = tab.getAttribute('data-course-tab');
        switchCourseTab(tabKey, false);
      });
    });

    // Check initial hash in URL
    if (window.location.hash) {
      switchCourseTab(window.location.hash, false);
    }
  }

  // Quick jump buttons from course cards
  document.querySelectorAll('[data-jump-course]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseKey = btn.getAttribute('data-jump-course');
      switchCourseTab(courseKey, true);
    });
  });

  // 3. Interactive Office Studio Simulator (on index.html)
  const studioTabs = document.querySelectorAll('[data-studio-tab]');
  const studioScreens = document.querySelectorAll('.studio-screen');
  const studioWrapper = document.getElementById('office-studio-wrapper');

  function switchStudioTab(tabKey) {
    if (!tabKey) return;
    tabKey = tabKey.toLowerCase();

    // Update Tab Buttons
    studioTabs.forEach((tab) => {
      const target = tab.getAttribute('data-studio-tab');
      if (target === tabKey) {
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      }
    });

    // Update Screen Views
    studioScreens.forEach((screen) => {
      if (screen.id === `screen-${tabKey}`) {
        screen.classList.add('is-active');
      } else {
        screen.classList.remove('is-active');
      }
    });
  }

  if (studioTabs.length > 0) {
    studioTabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const tabKey = tab.getAttribute('data-studio-tab');
        switchStudioTab(tabKey);
        stopStudioAutoCycle();
      });
    });

    // Optional gentle auto-rotation every 5s if user hasn't interacted
    const tabKeys = ['excel', 'word', 'ppt'];
    let currentIdx = 0;
    let autoCycleTimer = setInterval(() => {
      currentIdx = (currentIdx + 1) % tabKeys.length;
      switchStudioTab(tabKeys[currentIdx]);
    }, 5000);

    function stopStudioAutoCycle() {
      if (autoCycleTimer) {
        clearInterval(autoCycleTimer);
        autoCycleTimer = null;
      }
    }

    if (studioWrapper) {
      studioWrapper.addEventListener('mouseenter', stopStudioAutoCycle);
      studioWrapper.addEventListener('touchstart', stopStudioAutoCycle, { passive: true });
    }
  }

  // 4. Pre-fill Course on Registration Page (dang-ky.html?course=...)
  const courseSelect = document.getElementById('course');
  if (courseSelect) {
    const urlParams = new URLSearchParams(window.location.search);
    const courseParam = urlParams.get('course');
    if (courseParam) {
      const options = courseSelect.options;
      for (let i = 0; i < options.length; i++) {
        if (options[i].value.toLowerCase().includes(courseParam.toLowerCase())) {
          courseSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  // 5. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 6. Registration Form Submission Feedback
  const regForm = document.getElementById('reg-form');
  if (regForm) {
    regForm.addEventListener('submit', function () {
      const submitBtn = regForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi đăng ký...';

        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Đã gửi thành công!';
          submitBtn.style.backgroundColor = '#16a34a';
          alert('Cảm ơn bạn đã đăng ký! Duy Cương sẽ liên hệ tư vấn lộ trình và xếp lịch sớm nhất.');
          regForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Gửi đăng ký →';
          submitBtn.style.backgroundColor = '';
        }, 1200);
      }
    });
  }

  // 7. Quick Copy Trigger & Toast Notification (for Contact Hub)
  const copyTriggers = document.querySelectorAll('.copy-trigger');
  if (copyTriggers.length > 0) {
    // Create toast container if not present
    let toast = document.querySelector('.toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-msg';
      toast.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span class="toast-text">Đã sao chép thành công!</span>';
      document.body.appendChild(toast);
    }

    let toastTimeout;
    copyTriggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy') || btn.innerText;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`Đã sao chép: "${textToCopy}"`);
          }).catch(() => {
            showToast(`Đã sao chép: "${textToCopy}"`);
          });
        } else {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`Đã sao chép: "${textToCopy}"`);
        }
      });
    });

    function showToast(message) {
      if (!toast) return;
      const textEl = toast.querySelector('.toast-text');
      if (textEl) textEl.textContent = message;
      toast.classList.add('is-active');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('is-active');
      }, 2500);
    }
  }

  // 8. Spatial UI: Interactive Pointer Illumination & Micro-tilt Physics
  function initSpatialPointerIllumination() {
    const spatialTargets = document.querySelectorAll(`
      .card, 
      .spatial-card, 
      .course-card,
      .project-card, 
      .feature-card, 
      .quick-card, 
      .module-card, 
      .module-panel, 
      .vip-card, 
      .contact-vip-card,
      .contact-profile-box,
      .checker-tool-box, 
      .checker-download-box,
      .checker-cafe-card, 
      .hero-profile-card, 
      .step,
      .step-card, 
      .quote-box,
      .checker-notice-box,
      .main-tab,
      .ribbon-tab,
      .sheet,
      .grandbar,
      .nckh-gb,
      .result-box,
      .post-row
    `);

    spatialTargets.forEach((el) => {
      if (el.dataset.spatialBound) return;
      el.dataset.spatialBound = 'true';
      el.classList.add('spatial-interactive');

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);

        // Calculate normalized tilt (-1 to 1)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = ((y - centerY) / centerY) * -3.5; // Max 3.5 deg
        const tiltY = ((x - centerX) / centerX) * 3.5;  // Max 3.5 deg

        el.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
        el.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
      });

      el.addEventListener('mouseleave', () => {
        el.style.setProperty('--tilt-x', `0deg`);
        el.style.setProperty('--tilt-y', `0deg`);
      });
    });
  }

  // Run spatial pointer illumination
  initSpatialPointerIllumination();

  // Re-run when dynamic elements render
  const observer = new MutationObserver(() => {
    initSpatialPointerIllumination();
  });
  observer.observe(document.body, { childList: true, subtree: true });
});


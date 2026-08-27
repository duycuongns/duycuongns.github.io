/**
 * Site Components (Header & Footer) Loader & macOS Dock Navigation
 * Tác giả: Nguyễn Duy Cương Website
 */

(function () {
  'use strict';

  // --- THEME INITIALIZATION (Run Immediately to avoid FOUC) ---
  function getPreferredTheme() {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
      }
    } catch (e) {}
    return 'dark'; // Mặc định là giao diện Tối
  }

  function applyTheme(theme) {
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.setAttribute('data-theme', theme);
    }
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', theme);
      }
    } catch (e) {}

    // Update toggle icons if available
    if (typeof document !== 'undefined') {
      const themeToggles = document.querySelectorAll('.theme-toggle');
      themeToggles.forEach((btn) => {
        const icon = btn.querySelector('i');
        if (icon) {
          if (theme === 'dark') {
            icon.className = 'fa-solid fa-moon';
            btn.setAttribute('aria-label', 'Đang ở chế độ Tối. Nhấn để chuyển sang chế độ Sáng');
            btn.setAttribute('title', 'Chuyển sang chế độ Sáng');
          } else {
            icon.className = 'fa-solid fa-sun';
            btn.setAttribute('aria-label', 'Đang ở chế độ Sáng. Nhấn để chuyển sang chế độ Tối');
            btn.setAttribute('title', 'Chuyển sang chế độ Tối');
          }
        }
      });
    }
  }

  // Initial theme application
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // --- PATH & ROUTING HELPERS ---
  function isPagesDirectory() {
    const pathname = window.location.pathname.replace(/\\/g, '/');
    return pathname.includes('/pages/') || pathname.endsWith('/pages') || (window.location.href.includes('/pages/'));
  }

  function getBasePath() {
    return isPagesDirectory() ? '../' : './';
  }

  function getPagesPath() {
    return isPagesDirectory() ? '' : 'pages/';
  }

  function getCurrentPageName() {
    const pathname = window.location.pathname.replace(/\\/g, '/');
    const page = pathname.split('/').pop() || 'index.html';
    return page === '' ? 'index.html' : page;
  }

  function getHeaderHTML() {
    const base = getBasePath();
    const pages = getPagesPath();
    const currentTheme = (typeof document !== 'undefined' && document.documentElement && document.documentElement.getAttribute('data-theme')) || 'dark';
    const iconClass = currentTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    const titleText = currentTheme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối';

    return `
<header class="site-header macos-dock-wrapper">
  <!-- Desktop / Tablet macOS Bottom Dock -->
  <nav class="macos-dock" id="macos-dock" aria-label="Thanh điều hướng macOS Dock">
    <!-- Logo App -->
    <a href="${base}index.html" class="dock-item dock-logo-item" data-nav="index.html" aria-label="Trang chủ - Nguyễn Duy Cương">
      <div class="dock-icon-box">
        <div class="logo-avatar-inner">
          <img src="${base}images/logo.png" alt="Nguyễn Duy Cương" class="logo-img"
               onload="this.style.opacity=1" 
               onerror="this.style.opacity=0; this.nextElementSibling.style.display='flex';">
          <div class="logo-avatar-placeholder" style="display:none;">
            <i class="fa-solid fa-user-tie"></i>
          </div>
        </div>
      </div>
      <span class="dock-label">Duy Cương</span>
      <span class="dock-tooltip">Trang chủ</span>
      <span class="dock-dot"></span>
    </a>

    <div class="dock-divider"></div>

    <!-- Navigation Apps -->
    <div class="dock-nav-items" id="dock-nav-items">
      <!-- Trang chủ -->
      <a href="${base}index.html" class="dock-item" data-nav="index.html">
        <div class="dock-icon-box">
          <i class="fa-solid fa-house"></i>
        </div>
        <span class="dock-label">Trang chủ</span>
        <span class="dock-tooltip">Trang chủ</span>
        <span class="dock-dot"></span>
      </a>

      <!-- Khóa học -->
      <a href="${pages}khoa-hoc.html" class="dock-item" data-nav="khoa-hoc.html">
        <div class="dock-icon-box">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <span class="dock-label">Khóa học</span>
        <span class="dock-tooltip">Khóa đào tạo</span>
        <span class="dock-dot"></span>
      </a>

      <!-- Giới thiệu -->
      <a href="${pages}about.html" class="dock-item" data-nav="about.html">
        <div class="dock-icon-box">
          <i class="fa-solid fa-address-card"></i>
        </div>
        <span class="dock-label">Giới thiệu</span>
        <span class="dock-tooltip">Giới thiệu</span>
        <span class="dock-dot"></span>
      </a>

      <!-- Dự án (macOS App Popover) -->
      <div class="dock-item dock-dropdown" id="dock-projects-dropdown">
        <button type="button" class="dock-dropdown-toggle" aria-expanded="false" aria-haspopup="true">
          <div class="dock-icon-box">
            <i class="fa-solid fa-cubes-stacked"></i>
          </div>
          <span class="dock-label">Dự án <span class="caret">▴</span></span>
          <span class="dock-tooltip">Dự án & Tiện ích</span>
          <span class="dock-dot"></span>
        </button>
        <div class="dock-popover-menu">
          <div class="dock-popover-header">Hệ sinh thái Dự án</div>
          <a href="${pages}che-do-lam-viec.html" class="dock-popover-link" data-nav="che-do-lam-viec.html">
            <div class="dock-popover-icon blue"><i class="fa-solid fa-calculator"></i></div>
            <div class="dock-popover-text">
              <strong>Chế độ làm việc</strong>
              <small>Tính giờ giảng & NCKH</small>
            </div>
          </a>
          <a href="${pages}kiem-tra-ban-quyen.html" class="dock-popover-link" data-nav="kiem-tra-ban-quyen.html">
            <div class="dock-popover-icon amber"><i class="fa-solid fa-shield-halved"></i></div>
            <div class="dock-popover-text">
              <strong>Kiểm tra bản quyền</strong>
              <small>Rà soát Windows & Office</small>
            </div>
          </a>
          <a href="https://ca8eoffice.io.vn/" target="_blank" rel="noopener" class="dock-popover-link">
            <div class="dock-popover-icon purple"><i class="fa-solid fa-server"></i></div>
            <div class="dock-popover-text">
              <strong>Hệ thống Ca8Eoffice</strong>
              <small>Quản lý lịch trình công tác ↗</small>
            </div>
          </a>
        </div>
      </div>

      <!-- Liên hệ -->
      <a href="${pages}contact.html" class="dock-item" data-nav="contact.html">
        <div class="dock-icon-box">
          <i class="fa-solid fa-envelope-open-text"></i>
        </div>
        <span class="dock-label">Liên hệ</span>
        <span class="dock-tooltip">Liên hệ & Hỗ trợ</span>
        <span class="dock-dot"></span>
      </a>
    </div>

    <div class="dock-divider"></div>

    <!-- Actions: Đăng ký & Theme toggle -->
    <div class="dock-actions">
      <a href="${pages}dang-ky.html" class="dock-item dock-cta-item" data-nav="dang-ky.html">
        <div class="dock-icon-box cta-icon">
          <i class="fa-solid fa-rocket"></i>
        </div>
        <span class="dock-label cta-label">Đăng ký học</span>
        <span class="dock-tooltip">Đăng ký học ngay</span>
        <span class="dock-dot"></span>
      </a>

      <button type="button" class="dock-item theme-toggle" id="theme-toggle" aria-label="Chuyển chế độ sáng/tối" title="${titleText}">
        <div class="dock-icon-box">
          <i class="${iconClass}"></i>
        </div>
        <span class="dock-tooltip">Giao diện Sáng/Tối</span>
      </button>
    </div>
  </nav>

  <!-- Mobile Left Floating Dock Bar (Nằm gọn bên tay trái góc dưới màn hình) -->
  <div class="mobile-left-dock" id="mobile-left-dock">
    <button type="button" class="mobile-dock-btn mobile-menu-trigger" id="mobile-menu-trigger" aria-label="Mở Menu điều hướng" aria-expanded="false" aria-controls="mobile-left-drawer">
      <div class="logo-avatar-mini">
        <img src="${base}images/logo.png" alt="Duy Cương" class="logo-img"
             onload="this.style.opacity=1" 
             onerror="this.style.opacity=0; this.nextElementSibling.style.display='flex';">
        <div class="logo-avatar-placeholder" style="display:none;"><i class="fa-solid fa-user-tie"></i></div>
      </div>
      <span class="mobile-menu-text"><i class="fa-solid fa-compass"></i> Menu</span>
    </button>

    <a href="${pages}dang-ky.html" class="mobile-dock-btn mobile-cta-btn" data-nav="dang-ky.html" aria-label="Đăng ký học">
      <i class="fa-solid fa-rocket"></i>
    </a>

    <button type="button" class="mobile-dock-btn mobile-theme-btn theme-toggle" aria-label="Chuyển chế độ sáng/tối" title="${titleText}">
      <i class="${iconClass}"></i>
    </button>
  </div>

  <!-- Mobile Spatial Left Drawer (Trượt ra từ cạnh trái màn hình) -->
  <div class="mobile-drawer-backdrop" id="mobile-drawer-backdrop"></div>
  <aside class="mobile-left-drawer" id="mobile-left-drawer" aria-label="Bảng điều hướng di động" aria-hidden="true">
    <div class="mobile-drawer-head">
      <div class="mobile-drawer-user">
        <div class="logo-avatar-inner">
          <img src="${base}images/logo.png" alt="Nguyễn Duy Cương" class="logo-img"
               onload="this.style.opacity=1" 
               onerror="this.style.opacity=0; this.nextElementSibling.style.display='flex';">
          <div class="logo-avatar-placeholder" style="display:none;"><i class="fa-solid fa-user-tie"></i></div>
        </div>
        <div>
          <strong>Nguyễn Duy Cương</strong>
          <small>Giảng viên Khoa Ngoại ngữ - Tin học</small>
        </div>
      </div>
      <button type="button" class="mobile-drawer-close" id="mobile-drawer-close" aria-label="Đóng menu">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="mobile-drawer-nav">
      <a href="${base}index.html" class="mobile-drawer-link" data-nav="index.html">
        <div class="mobile-drawer-icon"><i class="fa-solid fa-house"></i></div>
        <span>Trang chủ</span>
      </a>
      <a href="${pages}khoa-hoc.html" class="mobile-drawer-link" data-nav="khoa-hoc.html">
        <div class="mobile-drawer-icon"><i class="fa-solid fa-graduation-cap"></i></div>
        <span>Khóa học</span>
      </a>
      <a href="${pages}about.html" class="mobile-drawer-link" data-nav="about.html">
        <div class="mobile-drawer-icon"><i class="fa-solid fa-address-card"></i></div>
        <span>Giới thiệu</span>
      </a>

      <div class="mobile-drawer-group-title">Hệ sinh thái Dự án</div>
      <a href="${pages}che-do-lam-viec.html" class="mobile-drawer-link" data-nav="che-do-lam-viec.html">
        <div class="mobile-drawer-icon blue"><i class="fa-solid fa-calculator"></i></div>
        <div>
          <strong>Chế độ làm việc nhà giáo</strong>
          <small>Tính giờ giảng & NCKH</small>
        </div>
      </a>
      <a href="${pages}kiem-tra-ban-quyen.html" class="mobile-drawer-link" data-nav="kiem-tra-ban-quyen.html">
        <div class="mobile-drawer-icon amber"><i class="fa-solid fa-shield-halved"></i></div>
        <div>
          <strong>Kiểm tra bản quyền</strong>
          <small>Rà soát Windows & Office</small>
        </div>
      </a>
      <a href="https://ca8eoffice.io.vn/" target="_blank" rel="noopener" class="mobile-drawer-link">
        <div class="mobile-drawer-icon purple"><i class="fa-solid fa-server"></i></div>
        <div>
          <strong>Hệ thống Ca8Eoffice</strong>
          <small>Quản lý lịch trình công tác ↗</small>
        </div>
      </a>

      <div class="mobile-drawer-group-title">Kết nối & Đào tạo</div>
      <a href="${pages}contact.html" class="mobile-drawer-link" data-nav="contact.html">
        <div class="mobile-drawer-icon"><i class="fa-solid fa-envelope-open-text"></i></div>
        <span>Liên hệ & Hỗ trợ</span>
      </a>
      <a href="${pages}dang-ky.html" class="mobile-drawer-link mobile-drawer-cta" data-nav="dang-ky.html">
        <div class="mobile-drawer-icon cta"><i class="fa-solid fa-rocket"></i></div>
        <span>Đăng ký học Online 1-Kèm-1</span>
      </a>
    </div>

    <div class="mobile-drawer-footer">
      <a href="tel:0919191804" class="btn"><i class="fa-solid fa-phone"></i> 091.91.91.804</a>
      <a href="https://zalo.me/atomins" target="_blank" rel="noopener" class="btn"><i class="fa-solid fa-comment-dots"></i> Zalo</a>
    </div>
  </aside>
</header>
    `.trim();
  }

  function getFooterHTML() {
    const base = getBasePath();
    const pages = getPagesPath();

    return `
<footer class="site-footer">
  <div class="container footer-row">
    <span>© 2026 Nguyễn Duy Cương — Giảng viên Khoa Ngoại ngữ - Tin học, Học viện Chính trị CAND</span>
    <div class="footer-links">
      <a href="tel:0919191804"><i class="fa-solid fa-phone"></i> 091.91.91.804</a>
      <a href="https://zalo.me/atomins" target="_blank" rel="noopener"><i class="fa-solid fa-comment-dots"></i> Zalo</a>
    </div>
  </div>
</footer>
    `.trim();
  }

  function renderHeader() {
    let headerContainer = document.getElementById('site-header');
    const headerHTML = getHeaderHTML();
    if (!headerContainer) {
      const existingHeader = document.querySelector('header.site-header');
      if (existingHeader) {
        existingHeader.outerHTML = headerHTML;
      } else {
        headerContainer = document.createElement('div');
        headerContainer.id = 'site-header';
        document.body.insertAdjacentElement('afterbegin', headerContainer);
        headerContainer.innerHTML = headerHTML;
      }
    } else {
      headerContainer.innerHTML = headerHTML;
    }
  }

  function renderFooter() {
    let footerContainer = document.getElementById('site-footer');
    const footerHTML = getFooterHTML();
    if (!footerContainer) {
      const existingFooter = document.querySelector('footer.site-footer');
      if (existingFooter) {
        existingFooter.outerHTML = footerHTML;
      } else {
        footerContainer = document.createElement('div');
        footerContainer.id = 'site-footer';
        document.body.insertAdjacentElement('beforeend', footerContainer);
        footerContainer.innerHTML = footerHTML;
      }
    } else {
      footerContainer.innerHTML = footerHTML;
    }
  }

  function highlightActiveNav() {
    const currentPage = getCurrentPageName();
    let targetNav = currentPage;

    const dockItems = document.querySelectorAll('.dock-item[data-nav], .dock-popover-link[data-nav], .mobile-drawer-link[data-nav], .mobile-dock-btn[data-nav]');
    dockItems.forEach((link) => {
      const linkNav = link.getAttribute('data-nav');
      if (linkNav === targetNav) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('is-active');

        // Check if inside dropdown
        const parentDropdown = link.closest('.dock-dropdown');
        if (parentDropdown) {
          parentDropdown.classList.add('is-active');
          const toggleBtn = parentDropdown.querySelector('.dock-dropdown-toggle');
          if (toggleBtn) {
            toggleBtn.classList.add('is-active');
          }
        }
      } else {
        link.removeAttribute('aria-current');
        link.classList.remove('is-active');
      }
    });
  }

  // --- macOS DOCK PARABOLIC MAGNIFICATION & PHYSICS ---
  function initDockMagnification() {
    const dock = document.getElementById('macos-dock');
    if (!dock) return;

    // Desktop hover magnification
    const items = dock.querySelectorAll('.dock-item');

    dock.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 851) return; // Disable on mobile/tablet

      const mouseX = e.clientX;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(mouseX - itemCenterX);
        const maxDistance = 140; // Magnification radius in px

        if (distance < maxDistance) {
          // Parabolic curve: 1.0 (no scale) up to 1.28 (max scale)
          const norm = 1 - distance / maxDistance;
          const scale = 1 + Math.sin(norm * (Math.PI / 2)) * 0.26;
          const translateY = -Math.sin(norm * (Math.PI / 2)) * 10; // Lift UPWARDS

          item.style.setProperty('--dock-scale', scale.toFixed(3));
          item.style.setProperty('--dock-translate-y', `${translateY.toFixed(1)}px`);
        } else {
          item.style.setProperty('--dock-scale', '1');
          item.style.setProperty('--dock-translate-y', '0px');
        }
      });
    });

    dock.addEventListener('mouseleave', () => {
      items.forEach((item) => {
        item.style.setProperty('--dock-scale', '1');
        item.style.setProperty('--dock-translate-y', '0px');
      });
    });
  }

  function initNavInteractions() {
    function openMobileDrawer() {
      const mobileDrawer = document.getElementById('mobile-left-drawer');
      const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');
      const mobileTrigger = document.getElementById('mobile-menu-trigger');
      if (mobileDrawer && mobileBackdrop) {
        mobileDrawer.classList.add('is-open');
        mobileBackdrop.classList.add('is-open');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        if (mobileTrigger) mobileTrigger.setAttribute('aria-expanded', 'true');
        document.body.classList.add('drawer-open');
      }
    }

    function closeMobileDrawer() {
      const mobileDrawer = document.getElementById('mobile-left-drawer');
      const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');
      const mobileTrigger = document.getElementById('mobile-menu-trigger');
      if (mobileDrawer && mobileBackdrop) {
        mobileDrawer.classList.remove('is-open');
        mobileBackdrop.classList.remove('is-open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        if (mobileTrigger) mobileTrigger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('drawer-open');
      }
    }

    // Global Event Delegation for reliable touch and click
    document.addEventListener('click', function (e) {
      // 1. Nếu click vào link chuyển trang (popover link hoặc mobile drawer link), cho phép điều hướng ngay 1 click
      const popoverLink = e.target.closest('.dock-popover-link');
      if (popoverLink) {
        const href = popoverLink.getAttribute('href');
        if (href && !href.startsWith('#')) {
          // Cho phép trình duyệt chuyển trang ngay lập tức
          return;
        }
      }

      // 2. Mobile menu toggle button
      const triggerBtn = e.target.closest('#mobile-menu-trigger');
      if (triggerBtn) {
        e.preventDefault();
        e.stopPropagation();
        const mobileDrawer = document.getElementById('mobile-left-drawer');
        if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
          closeMobileDrawer();
        } else {
          openMobileDrawer();
        }
        return;
      }

      // 3. Nút đóng hoặc Backdrop
      if (e.target.closest('#mobile-drawer-close') || e.target.closest('#mobile-drawer-backdrop')) {
        e.preventDefault();
        e.stopPropagation();
        closeMobileDrawer();
        return;
      }

      // 4. Nếu bấm vào liên kết trong mobile drawer:
      const drawerLink = e.target.closest('.mobile-drawer-link, .mobile-drawer-footer a');
      if (drawerLink) {
        const href = drawerLink.getAttribute('href');
        if (href && href.startsWith('#')) {
          closeMobileDrawer();
        }
        // Link sang trang khác: để trình duyệt tự chuyển trang tự nhiên 1 click
        return;
      }

      // 5. Nút đổi theme
      const themeBtn = e.target.closest('.theme-toggle');
      if (themeBtn) {
        e.preventDefault();
        e.stopPropagation();
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        return;
      }
    });

    // 6. Xử lý Hover mượt mà & có vùng đệm 300ms (Grace Period) cho Dock Popover
    const dockDropdown = document.querySelector('.dock-dropdown');
    if (dockDropdown) {
      let closeTimer = null;

      dockDropdown.addEventListener('mouseenter', function () {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        dockDropdown.classList.add('is-open');
        const dt = dockDropdown.querySelector('.dock-dropdown-toggle');
        if (dt) dt.setAttribute('aria-expanded', 'true');
      });

      dockDropdown.addEventListener('mouseleave', function () {
        closeTimer = setTimeout(function () {
          dockDropdown.classList.remove('is-open');
          const dt = dockDropdown.querySelector('.dock-dropdown-toggle');
          if (dt) dt.setAttribute('aria-expanded', 'false');
        }, 300);
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const dropdown = document.querySelector('.dock-dropdown');
        if (dropdown) {
          dropdown.classList.remove('is-open');
          const dt = document.querySelector('.dock-dropdown-toggle');
          if (dt) dt.setAttribute('aria-expanded', 'false');
        }
        closeMobileDrawer();
      }
    });
  }

  function init() {
    renderHeader();
    renderFooter();
    highlightActiveNav();
    initDockMagnification();
    initNavInteractions();
    applyTheme(getPreferredTheme());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/**
 * TechNova — 响应式导航栏
 * main.js  |  核心渲染机制 + 原生交互
 */

import { SITE_CONFIG } from './config.js';

(function () {
  'use strict';

  /* ============================================================
     0. 全量动态内容渲染引擎
     ============================================================ */
  function initDynamicContent() {
    // A. 基础页面标题与导航元素
    document.title = SITE_CONFIG.pageTitle;

    const logoTextEl = document.getElementById('site-logo-text');
    const logoLinkEl = document.getElementById('site-logo-link');
    if (logoTextEl && logoLinkEl) {
      logoTextEl.innerHTML = `${SITE_CONFIG.navbar.brand.name}<strong>${SITE_CONFIG.navbar.brand.accent}</strong>`;
      logoLinkEl.setAttribute('href', SITE_CONFIG.navbar.brand.homeLink);
      logoLinkEl.setAttribute('aria-label', `${SITE_CONFIG.navbar.brand.name}${SITE_CONFIG.navbar.brand.accent} 首页`);
    }

    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
      ctaButton.textContent = SITE_CONFIG.navbar.cta.text;
      ctaButton.setAttribute('href', SITE_CONFIG.navbar.cta.link);
      ctaButton.setAttribute('aria-label', `${SITE_CONFIG.navbar.cta.text}使用`);
    }

    // B. 循环渲染导航菜单
    const navListContainer = document.getElementById('dynamic-nav-list');
    if (navListContainer) {
      let listHtml = '';
      SITE_CONFIG.navbar.menuItems.forEach(item => {
        if (item.dropdown && item.dropdown.length > 0) {
          let dropdownHtml = `
            <li class="nav-item nav-item--dropdown">
              <a href="${item.link}" class="nav-link" aria-haspopup="true" aria-expanded="false">
                ${item.name}
                <svg class="chevron" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                  <path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </a>
              <ul class="dropdown" role="list">
          `;
          item.dropdown.forEach(subItem => {
            dropdownHtml += `<li><a href="${subItem.link}" class="dropdown__link">${subItem.name}</a></li>`;
          });
          dropdownHtml += `</ul></li>`;
          listHtml += dropdownHtml;
        } else {
          listHtml += `
            <li class="nav-item">
              <a href="${item.link}" class="nav-link ${item.active ? 'active' : ''}" ${item.active ? 'aria-current="page"' : ''}>
                ${item.name}
              </a>
            </li>
          `;
        }
      });
      navListContainer.innerHTML = listHtml;
    }

    // C. 渲染 Hero 区域
    setText('hero-badge', SITE_CONFIG.hero.badge);
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = `${SITE_CONFIG.hero.titleLine1}<br/><span class="gradient-text">${SITE_CONFIG.hero.titleGradient}</span>`;
    }
    const heroDesc = document.getElementById('hero-desc');
    if (heroDesc) heroDesc.innerHTML = SITE_CONFIG.hero.desc;
    
    setLinkAndText('hero-btn-primary', SITE_CONFIG.hero.btnPrimary.text, SITE_CONFIG.hero.btnPrimary.link);
    setLinkAndText('hero-btn-ghost', SITE_CONFIG.hero.btnGhost.text, SITE_CONFIG.hero.btnGhost.link);

    // D. 渲染 About 区域
    setText('about-title', SITE_CONFIG.about.title);
    setText('about-desc', SITE_CONFIG.about.desc);

    // E. 循环渲染 Products 卡片
    setText('products-title', SITE_CONFIG.products.title);
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
      productsGrid.innerHTML = SITE_CONFIG.products.cards.map(card => `
        <article class="card">
          <div class="card__icon">${card.icon}</div>
          <h3>${card.title}</h3>
          <p>${card.desc}</p>
        </article>
      `).join('');
    }

    // L. 循环渲染 News 列表
    setText('news-title', SITE_CONFIG.news.title);
    const newsList = document.getElementById('news-list');
    if (newsList) {
      newsList.innerHTML = SITE_CONFIG.news.items.map(news => `
        <li class="news-item">
          <time class="news-date">${news.date}</time>
          <a href="${news.link}" class="news-link">${news.text}</a>
        </li>
      `).join('');
    }

    // F. 渲染 Contact 区域
    setText('contact-title', SITE_CONFIG.contact.title);
    setText('contact-desc', SITE_CONFIG.contact.desc);
    const contactInfo = document.getElementById('contact-info');
    if (contactInfo) {
      contactInfo.innerHTML = `
        <p>📧 ${SITE_CONFIG.contact.email}</p>
        <p>📞 ${SITE_CONFIG.contact.phone}</p>
        <p>📍 ${SITE_CONFIG.contact.address}</p>
      `;
    }

    // G. 页脚
    setText('footer-text', SITE_CONFIG.footer.copyRight);
  }

  // 快捷辅助函数
  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
  function setLinkAndText(id, text, link) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = text;
      el.setAttribute('href', link);
    }
  }

  // 执行全量渲染
  initDynamicContent();


  /* ============================================================
     DOM 选择器缓存 (交互逻辑部分开始)
     ============================================================ */
  const navbar      = document.getElementById('navbar');
  const menuToggle  = document.getElementById('menu-toggle');
  const navMenu     = document.getElementById('nav-menu');
  const navOverlay  = document.getElementById('nav-overlay');
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl      = document.documentElement;

  const navLinks    = document.querySelectorAll('.nav-link');
  const dropdownItems = document.querySelectorAll('.nav-item--dropdown');

  /* ============================================================
     1. 汉堡菜单 展开 / 收起
     ============================================================ */
  function openMenu() {
    navMenu.classList.add('is-open');
    menuToggle.classList.add('is-active');
    navOverlay.classList.add('is-visible');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', '收起导航菜单');
    navOverlay.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenu.classList.remove('is-open');
    menuToggle.classList.remove('is-active');
    navOverlay.classList.remove('is-visible');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '展开导航菜单');
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  }

  menuToggle.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
      closeAllDropdowns();
    }
  });

  /* ============================================================
     2. 移动端下拉菜单手风琴
     ============================================================ */
  dropdownItems.forEach(function (item) {
    const link     = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown');
    if (!link || !dropdown) return;

    link.addEventListener('click', function (e) {
      if (window.innerWidth > 767) return;
      e.preventDefault();
      const isExpanded = link.getAttribute('aria-expanded') === 'true';
      closeAllDropdowns();
      if (!isExpanded) {
        link.setAttribute('aria-expanded', 'true');
        dropdown.classList.add('is-open');
      }
    });
  });

  function closeAllDropdowns() {
    dropdownItems.forEach(function (item) {
      const link     = item.querySelector('.nav-link');
      const dropdown = item.querySelector('.dropdown');
      if (link) link.setAttribute('aria-expanded', 'false');
      if (dropdown) dropdown.classList.remove('is-open');
    });
  }

  /* ============================================================
     3. 导航链接点击高亮 + 关闭移动菜单
     ============================================================ */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (l) {
        l.classList.remove('active');
        l.removeAttribute('aria-current');
      });
      this.classList.add('active');
      this.setAttribute('aria-current', 'page');
      if (window.innerWidth <= 767) {
        closeMenu();
      }
    });
  });

  /* ============================================================
     4. 滚动吸顶
     ============================================================ */
  function handleScroll() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 20) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ============================================================
     5. 深色 / 浅色主题切换
     ============================================================ */
  function getStoredTheme() { return localStorage.getItem('tn-theme'); }

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('tn-theme', theme);
    themeToggle.setAttribute('aria-label', theme === 'dark' ? '切换为浅色模式' : '切换为深色模式');
    themeToggle.setAttribute('title', theme === 'dark' ? '切换为浅色模式' : '切换为深色模式');
  }

  themeToggle.addEventListener('click', function() {
    var current = htmlEl.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  (function initTheme() {
    var stored = getStoredTheme();
    if (stored) { applyTheme(stored); } else {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  })();

  /* ============================================================
     6. 窗口 Resize 状态重置
     ============================================================ */
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 767) {
        closeMenu();
        closeAllDropdowns();
      }
    }, 150);
  });

  /* ============================================================
     7. 平滑滚动到 section
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var navH   = parseInt(getComputedStyle(htmlEl).getPropertyValue('--nav-height') || '64', 10);
      var offset = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

})();
const googlePlayUrl =
  "https://play.google.com/store/apps/details?id=com.shukrie.boomlyapp";
const appStoreUrl = "YOUR_APP_STORE_LINK";
const instagramUrl =
  "https://www.instagram.com/get_boomly?igsh=MWVjZGpjb2IwMGtvOA%3D%3D&utm_source=qr";
const tiktokUrl = "https://www.tiktok.com/@getboomly?_r=1&_t=ZS-97rtq2sOKKD";
const youtubeUrl = "https://youtube.com/@get_boomly?si=BKmcI9_TJQtKCzpX";
const facebookUrl =
  "https://www.facebook.com/share/1HGLFBjeEk/?mibextid=wwXIfr";
const xUrl = "https://x.com/get_boomly?s=21";

function trackEvent(eventName, parameters = {}) {
  if (typeof gtag !== "function") {
    return;
  }

  gtag("event", eventName, parameters);
}

function updateBackToTopButton() {
  const button = document.querySelector(".back-to-top");

  if (!button) {
    return;
  }

  const page = getCurrentPage();
  const isSupportedPage =
    page === "privacy" || page === "terms" || page === "support";
  const hero = document.querySelector(".hero");
  const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 350;
  const shouldShow = isSupportedPage && window.scrollY > heroBottom + 350;

  button.classList.toggle("visible", shouldShow);
  button.setAttribute("aria-hidden", String(!isSupportedPage));
  button.tabIndex = isSupportedPage ? 0 : -1;
}

function updateStickyHeader() {
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");

  if (!header || !hero) {
    return;
  }

  const heroBottom = hero.offsetTop + hero.offsetHeight;
  header.classList.toggle("scrolled", window.scrollY > heroBottom);
}

function injectGlobalLayout() {
  const pathname = window.location.pathname;
  let header = document.querySelector(".site-header");
  const footer = document.querySelector(".footer");
  const modal = document.getElementById("storeModal");

  if (!header) {
    header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <nav class="navbar">
        <a class="brand" href="/" aria-label="Boomly home">
          <img
            class="brand-logo"
            src="/images/icon-192.png"
            alt="Boomly Logo"
          >
          <span class="brand-mark" style="display: none">
            <svg
              viewBox="0 0 64 78"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 76C32 76 59 47.5 59 28.5C59 12.8 47.1 3 32 3C16.9 3 5 12.8 5 28.5C5 47.5 32 76 32 76Z"
                fill="#111316"
              />
              <path
                d="M32 62C32 62 49.5 42.7 49.5 29.6C49.5 18.5 42.2 11.8 32 11.8C21.8 11.8 14.5 18.5 14.5 29.6C14.5 42.7 32 62 32 62Z"
                fill="#FBFAF7"
              />
              <path
                d="M29.5 48.3C22.7 46.7 18.2 40.6 18.2 33.3C18.2 24.7 24.5 17.9 32.8 17.9C34.2 17.9 35.5 18.1 36.7 18.5C32.4 21.4 29.7 26.7 29.7 33C29.7 39.3 32.4 44.7 36.8 47.6C34.6 48.6 32.1 48.9 29.5 48.3Z"
                fill="#111316"
              />
            </svg>
          </span>
          <span>Boomly</span>
        </a>

        <div class="nav-links">
          <a href="/">Home</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms_of_use">Terms of Use</a>
          <a href="/support">Support</a>
        </div>

        <a
          class="download-btn"
          href="#"
          id="downloadBoomlyBtn"
          aria-label="Download Boomly"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 20h14" />
          </svg>
          Download Boomly
        </a>
      </nav>
    `;
    document.body.insertBefore(header, document.body.firstChild);

    let hero = document.querySelector(".hero");

    if (!hero) {
      hero = document.createElement("section");
      hero.className = "hero";
      hero.innerHTML = `
      <div class="hero-inner">
        <div class="hero-copy">
          <h1>
            <span class="hero-line">Find good coffee.</span>
            <span class="accent">Anywhere.</span>
          </h1>
          <p>Boomly helps you discover great coffee spots near you.</p>
        </div>

        <div class="hero-art" aria-hidden="true">
          <svg
            viewBox="0 0 820 440"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="phone"
                x1="240"
                y1="35"
                x2="450"
                y2="390"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#343A34" />
                <stop offset="1" stop-color="#0F1210" />
              </linearGradient>
              <linearGradient
                id="cup"
                x1="535"
                y1="225"
                x2="645"
                y2="385"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#F4EADD" />
                <stop offset="1" stop-color="#D8C4AC" />
              </linearGradient>
              <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            <g class="cloud" fill="#FFFFFF" filter="url(#blur)">
              <path d="M82 83h128c-6-20-25-24-40-18-11-30-57-24-62 9-15-12-35-4-26 9Z" />
              <path d="M625 60h122c-7-20-26-22-38-16-10-30-52-25-59 6-16-11-34-2-25 10Z" />
            </g>

            <g opacity=".22" fill="#9D9C95">
              <rect x="100" y="230" width="34" height="80" rx="3" />
              <rect x="152" y="205" width="42" height="105" rx="4" />
              <rect x="212" y="165" width="52" height="145" rx="5" />
              <rect x="283" y="210" width="38" height="100" rx="4" />
              <rect x="335" y="190" width="44" height="120" rx="4" />
            </g>

            <path
              class="bird"
              d="M302 116c7-8 15-8 23 0M340 126c7-8 15-8 23 0"
              stroke="#7D8279"
              stroke-width="3"
              fill="none"
              stroke-linecap="round"
            />

            <g class="steam" fill="none" stroke-linecap="round">

              <!-- Main steam -->
              <path
                d="M592 226c-14-18 10-28 0-46-10-18 18-28 10-46-6-14 10-24 18-34"
                stroke="#104A4E"
                stroke-width="4"
                stroke-dasharray="9 12"
                opacity=".78"
              />

              <!-- Left steam -->
              <path
                d="M575 185c-10-14 8-22 2-36-7-15 12-22 7-35-4-10 7-18 12-24"
                stroke="#104A4E"
                stroke-width="3"
                stroke-dasharray="7 10"
                opacity=".45"
              />

              <!-- Right steam -->
              <path
                d="M610 205c8-10-4-18 2-28 6-11-8-18-2-27"
                stroke="#104A4E"
                stroke-width="3"
                stroke-dasharray="7 10"
                opacity=".55"
              />

            </g>

            <g transform="translate(270 22) rotate(10 120 180)">
              <rect x="48" y="0" width="214" height="355" rx="38" fill="url(#phone)" />
              <rect x="64" y="20" width="182" height="315" rx="28" fill="#EDE9DD" />
              <path d="M120 25h70c-3 13-9 18-22 18h-26c-13 0-19-5-22-18Z" fill="#121512" />
              <g stroke="#FFFFFF" stroke-width="8" opacity=".82">
                <path d="M72 88h168M72 155h168M72 223h168M104 30v300M172 30v300" />
              </g>
              <g fill="#FCE5C8" opacity=".75">
                <rect x="133" y="74" width="55" height="44" rx="3" />
                <rect x="78" y="174" width="46" height="50" rx="3" />
                <rect x="175" y="241" width="48" height="52" rx="3" />
              </g>
              <ellipse cx="158" cy="242" rx="55" ry="18" fill="#FCE5C8" />
              <ellipse cx="158" cy="242" rx="35" ry="10" fill="none" stroke="#104A4E" stroke-width="5" />
              <path d="M158 227s42-45 42-82c0-27-19-47-42-47s-42 20-42 47c0 37 42 82 42 82Z" fill="#104A4E" />
              <circle cx="158" cy="143" r="25" fill="#F8F5ED" />
              <path d="M146 134h20v15a10 10 0 0 1-10 10 10 10 0 0 1-10-10v-15Z" fill="#104A4E" />
              <path d="M166 139h4a6 6 0 0 1 0 12h-4" fill="none" stroke="#104A4E" stroke-width="4" />
            </g>

            <g transform="translate(525 198)">
              <ellipse cx="63" cy="179" rx="79" ry="16" fill="#C5B7A4" opacity=".35" />
              <path d="M20 48h86l-12 128H34L20 48Z" fill="url(#cup)" />
              <path d="M13 41c0-16 24-30 51-30s51 14 51 30v16H13V41Z" fill="#252A26" />
              <rect x="6" y="46" width="116" height="20" rx="10" fill="#151817" />
              <path d="M69 95h4a5 5 0 0 1 0 10h-4" fill="none" stroke="#F5E9DA" stroke-width="3" />
            </g>

            <g transform="translate(670 196)">
              <ellipse cx="75" cy="178" rx="74" ry="14" fill="#C5B7A4" opacity=".32" />
              <rect x="21" y="93" width="108" height="86" rx="25" fill="#E9E0D2" />
              <path d="M24 113c6-20 25-30 51-30s45 10 51 30" fill="#F8F2E8" />
             <path d="M72 90C45 60 27 54 16 64c25 31 47 35 56 26Z" fill="#0B3A3E" />
              <path d="M75 92C72 52 86 34 102 38c5 38-12 51-27 54Z" fill="#F6B236" />
              <path d="M78 94c31-33 55-38 68-24-32 35-57 35-68 24Z" fill="#104A4E" />
              <path d="M74 95c-18-34-14-55 0-63 19 30 14 51 0 63Z" fill="#104A4E" />
            </g>

            <g fill="#6B4428">
              <ellipse cx="502" cy="385" rx="12" ry="7" />
              <ellipse cx="538" cy="390" rx="12" ry="7" />
              <ellipse cx="570" cy="382" rx="12" ry="7" />
            </g>

            <path
              d="M744 64s27-7 35 16c8 23-25 47-35 59-10-12-43-36-35-59 8-23 35-16 35-16Z"
              fill="#104A4E"
              transform="scale(.42) translate(1280 90)"
            />
            <circle cx="726" cy="104" r="8" fill="#F9F7EF" />
          </svg>
        </div>
      </div>
    `;

      header.insertAdjacentElement("afterend", hero);
    }
  }

  if (!footer || !modal) {
    return;
  }

  let backToTopButton = document.querySelector(".back-to-top");

  if (!backToTopButton) {
    backToTopButton = document.createElement("button");
    backToTopButton.className = "back-to-top";
    backToTopButton.type = "button";
    backToTopButton.setAttribute("aria-label", "Back to top");
    backToTopButton.setAttribute("aria-hidden", "true");
    backToTopButton.tabIndex = -1;
    backToTopButton.innerHTML = `
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    `;

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.body.appendChild(backToTopButton);
  }

  updateBackToTopButton();
  updateStickyHeader();

  // Set active navigation link
  const navLinks = header.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  if (pathname === "/" || pathname === "/index.html") {
    const homeLink = header.querySelector('.nav-links a[href="/"]');
    if (homeLink) homeLink.classList.add("active");
  } else if (pathname.includes("privacy")) {
    const privacyLink = header.querySelector('.nav-links a[href="/privacy"]');
    if (privacyLink) privacyLink.classList.add("active");
  } else if (pathname.includes("terms_of_use")) {
    const termsLink = header.querySelector(
      '.nav-links a[href="/terms_of_use"]',
    );
    if (termsLink) termsLink.classList.add("active");
  } else if (pathname.includes("support")) {
    const supportLink = header.querySelector('.nav-links a[href="/support"]');
    if (supportLink) supportLink.classList.add("active");
  }

  const existingPartnerSection = document.querySelector(".partner-section");
  const isHomePage = pathname === "/" || pathname === "/index.html";

  if (existingPartnerSection) {
    existingPartnerSection.remove();
  }

  if (isHomePage) {
    const partnerSection = document.createElement("section");
    partnerSection.className = "partner-section";
    partnerSection.id = "partners";
    partnerSection.innerHTML = `
      <div class="partner-card">
        <div class="partner-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coffee-icon lucide-coffee">
            <path d="M10 2v2"/>
            <path d="M14 2v2"/>
            <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>
            <path d="M6 2v2"/>
          </svg>
        </div>

        <div class="partner-copy">
          <p class="eyebrow">For café owners</p>
          <h2>Own a coffee shop?</h2>
          <p>
            Feature your café or explore promotional opportunities with Boomly.
          </p>
        </div>

        <a
          class="partner-link"
          href="mailto:partnerships@getboomly.com"
        >
          Partner with Boomly
        </a>
      </div>
    `;

    footer.parentNode.insertBefore(partnerSection, footer);

    const partnerLink = partnerSection.querySelector(".partner-link");
    partnerLink?.addEventListener("click", () => {
      trackEvent("partnership_email_click", {
        page: "home",
      });
    });
  }

  // Replace footer HTML
  footer.innerHTML = `
<div class="footer-content">
  <div class="footer-brand-block">
    <img
      src="/images/icon-192.png"
      alt="Boomly"
      class="footer-logo"
    >

    <div class="footer-brand-copy">
      <strong>Boomly</strong>
      <p>Less searching. More coffee.</p>
    </div>
  </div>

  <div class="footer-origin">
    <strong>Made in Cape Town 🇿🇦</strong>
    <p>Helping South Africans discover better coffee.</p>
  </div>

  <div class="footer-social" aria-label="Boomly social media">
    <a href="${instagramUrl}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
      <img
        src="https://getboomly.com/images/email/insta-icon.svg"
        alt="Instagram"
        class="social-icon"
      >
    </a>

    <a href="${tiktokUrl}" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
      <img
        src="https://getboomly.com/images/email/tiktok-icon.svg"
        alt="TikTok"
        class="social-icon"
      >
    </a>

    <a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
      <img
        src="https://getboomly.com/images/email/Youtube-icon.svg"
        alt="YouTube"
        class="social-icon"
      >
    </a>

    <a href="${facebookUrl}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
      <img
        src="https://getboomly.com/images/email/facebook-icon.svg"
        alt="Facebook"
        class="social-icon"
      >
    </a>

    <a href="${xUrl}" target="_blank" rel="noopener noreferrer" aria-label="X">
      <img
        src="https://getboomly.com/images/email/x-icon.svg"
        alt="X"
        class="social-icon"
      >
    </a>
  </div>

  <div class="footer-links" aria-label="Footer navigation">
    <a href="/privacy">Privacy</a>
    <span aria-hidden="true">•</span>
    <a href="/terms_of_use">Terms</a>
    <span aria-hidden="true">•</span>
    <a href="/support">Support</a>
  </div>

  <p class="footer-copyright">© 2026 Boomly. All rights reserved.</p>
</div>
`;
}

function getDeviceType() {
  const userAgent =
    navigator.userAgent || navigator.vendor || window.opera || "";

  if (/android/i.test(userAgent)) {
    return "android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "ios";
  }

  if (
    navigator.platform === "MacIntel" &&
    navigator.maxTouchPoints &&
    navigator.maxTouchPoints > 1
  ) {
    return "ios";
  }

  return "desktop";
}

function getCurrentPage() {
  const pathname = window.location.pathname;

  if (pathname === "/" || pathname === "/index.html") return "home";
  if (pathname.includes("privacy")) return "privacy";
  if (pathname.includes("terms_of_use")) return "terms";
  if (pathname.includes("support")) return "support";

  return "unknown";
}

async function navigateToPage(url, { updateHistory = true } = {}) {
  const targetUrl = new URL(url, window.location.origin);
  const currentMain = document.querySelector("main.page-wrap");

  if (!currentMain) {
    window.location.href = targetUrl.href;
    return;
  }

  try {
    const response = await fetch(targetUrl.href, {
      headers: {
        "X-Requested-With": "BoomlyNavigation",
      },
    });

    if (!response.ok) {
      throw new Error(`Unable to load page: ${response.status}`);
    }

    const html = await response.text();
    const parsedDocument = new DOMParser().parseFromString(html, "text/html");
    const nextMain = parsedDocument.querySelector("main.page-wrap");

    if (!nextMain) {
      throw new Error("The requested page does not contain the expected main content.");
    }

    currentMain.replaceWith(nextMain);
    document.title = parsedDocument.title || document.title;

    if (updateHistory) {
      window.history.pushState({}, "", targetUrl.pathname + targetUrl.search + targetUrl.hash);
    }

    injectGlobalLayout();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error(error);
    window.location.href = targetUrl.href;
  }
}

function shouldUseClientNavigation(link, event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return false;
  }

  if (!link || link.target === "_blank" || link.hasAttribute("download")) {
    return false;
  }

  const url = new URL(link.href, window.location.origin);
  const isSameOrigin = url.origin === window.location.origin;
  const isSupportedPage =
    url.pathname === "/" ||
    url.pathname === "/index.html" ||
    url.pathname.includes("privacy") ||
    url.pathname.includes("terms_of_use") ||
    url.pathname.includes("support");

  return isSameOrigin && isSupportedPage;
}

function openStoreModal() {
  const modal = document.getElementById("storeModal");

  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  trackEvent("download_store_choice_opened", {
    page: getCurrentPage(),
  });
}

function closeStoreModal() {
  const modal = document.getElementById("storeModal");

  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("DOMContentLoaded", () => {
  injectGlobalLayout();

  window.addEventListener("scroll", updateBackToTopButton, {
    passive: true,
  });
  window.addEventListener("scroll", updateStickyHeader, {
    passive: true,
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!shouldUseClientNavigation(link, event)) {
      return;
    }

    event.preventDefault();
    navigateToPage(link.href);
  });

  window.addEventListener("popstate", () => {
    navigateToPage(window.location.href, { updateHistory: false });
  });

  const downloadButton = document.getElementById("downloadBoomlyBtn");
  const closeButton = document.getElementById("closeStoreModal");
  const modal = document.getElementById("storeModal");

  downloadButton?.addEventListener("click", (event) => {
    event.preventDefault();

    const device = getDeviceType();

    const page = getCurrentPage();

    trackEvent("download_button_click", {
      page,
      device,
    });

    if (device === "android") {
      trackEvent("download_android_click", {
        page,
      });

      window.location.href = "market://details?id=com.shukrie.boomlyapp";

      setTimeout(() => {
        window.location.href = googlePlayUrl;
      }, 800);

      return;
    }

    if (device === "ios") {
      trackEvent("download_ios_click", {
        page,
      });
      window.location.href = appStoreUrl;
      return;
    }

    openStoreModal();
  });

  closeButton?.addEventListener("click", closeStoreModal);

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeStoreModal();
    }
  });

  document.querySelectorAll(".store-btn").forEach((button) => {
    button.removeAttribute("onclick");

    button.addEventListener("click", () => {
      const page = getCurrentPage();
      const isAndroid = button.href.includes("play.google.com");

      trackEvent(isAndroid ? "download_android_click" : "download_ios_click", {
        page,
      });
    });
  });
});

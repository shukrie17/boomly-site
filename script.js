const googlePlayUrl = "https://play.google.com/store/apps/details?id=com.shukrie.boomlyapp";
const appStoreUrl = "YOUR_APP_STORE_LINK";
const instagramUrl = "https://www.instagram.com/get_boomly?igsh=MWVjZGpjb2IwMGtvOA%3D%3D&utm_source=qr";
const tiktokUrl = "https://www.tiktok.com/@getboomly?_r=1&_t=ZS-97rtq2sOKKD";
const youtubeUrl = "https://youtube.com/@get_boomly?si=BKmcI9_TJQtKCzpX";
const facebookUrl = "https://www.facebook.com/share/1HGLFBjeEk/?mibextid=wwXIfr";
const xUrl = "https://x.com/get_boomly?s=21";

function injectGlobalLayout() {
  const pathname = window.location.pathname;
  const header = document.querySelector(".site-header");
  const footer = document.querySelector(".footer");
  const modal = document.getElementById("storeModal");

  if (!header || !footer || !modal) {
    return;
  }

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
    const termsLink = header.querySelector('.nav-links a[href="/terms_of_use"]');
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
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#406643" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coffee-icon lucide-coffee">
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
      gtag?.("event", "partnership_email_click", {
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

function openStoreModal() {
  const modal = document.getElementById("storeModal");

  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  if (typeof gtag === "function") {
    gtag("event", "download_store_choice_opened");
  }
}

function closeStoreModal() {
  const modal = document.getElementById("storeModal");

  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("DOMContentLoaded", () => {
  injectGlobalLayout();

  const downloadButton = document.getElementById("downloadBoomlyBtn");
  const closeButton = document.getElementById("closeStoreModal");
  const modal = document.getElementById("storeModal");

  downloadButton?.addEventListener("click", (event) => {
    event.preventDefault();

    const device = getDeviceType();

    const page = getCurrentPage();

    gtag?.("event", "download_button_click", {
      page,
      device,
    });

    if (device === "android") {
      gtag?.("event", "download_android_click", {
        page,
      });

      window.location.href =
        "market://details?id=com.shukrie.boomlyapp";

      setTimeout(() => {
        window.location.href =
          "https://play.google.com/store/apps/details?id=com.shukrie.boomlyapp";
      }, 800);

      return;
    }

    if (device === "ios") {
      gtag?.("event", "download_ios_click", {
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

      gtag?.(
        "event",
        isAndroid ? "download_android_click" : "download_ios_click",
        {
          page,
        },
      );
    });
  });
});
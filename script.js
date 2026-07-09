const googlePlayUrl = "https://play.google.com/store/apps/details?id=com.shukrie.boomlyapp&pcampaignid=web_share";
const appStoreUrl = "YOUR_APP_STORE_LINK";

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
  const downloadButton = document.getElementById("downloadBoomlyBtn");
  const closeButton = document.getElementById("closeStoreModal");
  const modal = document.getElementById("storeModal");

  downloadButton?.addEventListener("click", (event) => {
    event.preventDefault();

    const device = getDeviceType();

    if (device === "android") {
      gtag?.("event", "download_android_click");
      window.location.href = googlePlayUrl;
      return;
    }

    if (device === "ios") {
      gtag?.("event", "download_ios_click");
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
});
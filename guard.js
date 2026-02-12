/***** MOBILE-SAFE IDLE REDIRECT *****/

const IDLE_LIMIT = 15 * 60 * 1000; // 15 minutes
const KEY = "lastActivity";

// save activity time
function recordActivity() {
  localStorage.setItem(KEY, Date.now());
}

// check inactivity
function checkIdle() {
  const last = parseInt(localStorage.getItem(KEY) || "0");
  const now = Date.now();

  if (now - last > IDLE_LIMIT) {
    if (!location.pathname.includes("index.html")) {
      location.replace("index.html");
    }
  }
}

// record user actions
["click","touchstart","keydown","scroll"]
.forEach(e => window.addEventListener(e, recordActivity, {passive:true}));

// 🔥 IMPORTANT — run checks when page becomes active
window.addEventListener("focus", checkIdle);
window.addEventListener("pageshow", checkIdle);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) checkIdle();
});

// initial run
checkIdle();
recordActivity();

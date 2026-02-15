/***** MOBILE-SAFE IDLE REDIRECT (FINAL FIX) *****/

const IDLE_LIMIT = 15 * 60 * 1000; // 15 minutes
const KEY = "lastActivity";
const LOAD_TIME = Date.now(); // page load timestamp

function recordActivity() {
  localStorage.setItem(KEY, Date.now());
}

function checkIdle() {

  const last = localStorage.getItem(KEY);

  if (!last) {
    recordActivity();
    return;
  }

  const now = Date.now();
  const lastTime = parseInt(last);

  // 🟢 DO NOT REDIRECT within first 1 second of page load
  if (now - LOAD_TIME < 1000) return;

  if (now - lastTime > IDLE_LIMIT) {
    if (!location.pathname.includes("index.html")) {
      location.replace("index.html");
    }
  }
}

/* Record activity FIRST */
recordActivity();

/* Record user actions */
["click","touchstart","keydown","scroll"]
.forEach(e => window.addEventListener(e, recordActivity, {passive:true}));

/* Delay initial idle check slightly */
setTimeout(checkIdle, 300);

/* Run checks when page becomes active */
window.addEventListener("focus", () => setTimeout(checkIdle, 200));
window.addEventListener("pageshow", () => setTimeout(checkIdle, 200));
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) setTimeout(checkIdle, 200);
});

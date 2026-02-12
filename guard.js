/***** REFRESH-PROOF IDLE REDIRECT *****/

const IDLE_LIMIT = 15 * 60 * 1000; // 15 minutes
const STORAGE_KEY = "lastActivityTime";

// update activity timestamp
function recordActivity() {
  localStorage.setItem(STORAGE_KEY, Date.now());
}

// check inactivity
function checkIdle() {
  const last = parseInt(localStorage.getItem(STORAGE_KEY) || "0");
  const now = Date.now();

  if (now - last > IDLE_LIMIT) {
    if (!location.pathname.includes("index.html")) {
      location.replace("index.html");
    }
  }
}

// activity listeners
["click","touchstart","mousemove","keydown","scroll"]
.forEach(evt =>
  window.addEventListener(evt, recordActivity, { passive:true })
);

// run checks
recordActivity();     // first load
checkIdle();          // check immediately
setInterval(checkIdle, 5000); // repeat check

/***** GLOBAL BACK GUARD *****/
if (!location.pathname.includes("index.html")) {

  history.pushState(null, null, location.href);

  window.onpopstate = function () {
    location.replace("index.html");
  };

  window.addEventListener("pageshow", function(e){
    if (e.persisted) {
      location.replace("index.html");
    }
  });

}

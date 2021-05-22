/** Parsing Functions */

/**
 * Cleans a given string by removing all spaces and extraneous characters, then
 * setting all lettres to lower case
 * @param {string} text - text to clean
 */
function clean(text) {
  return text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, "").toLowerCase();
}

/** Scrolling Functions */

const SCROLL_UP_THRESHOLD = 5;
const SCROLL_DOWN_THRESHOLD = 20;
var showingNavbar = true;
var scrolling = false;
var prevScrollpos = window.pageYOffset;

/**
 * Hides the navbar
 */
function hideNavbar() {
  document.getElementById("navbar").style.top = "-500px";
  showingNavbar = false;
}

/**
 * Shows the navbar
 */
function showNavbar() {
  if (!scrolling) {
    document.getElementById("navbar").style.top = "0";
    showingNavbar = true;
  }
}

/**
 * When scrolling, hides or shows the navbar accordingly
 */
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;

  // Hide navbar if scroll too far down; show upon scrolling up
  if (currentScrollPos > prevScrollpos + SCROLL_DOWN_THRESHOLD) {
    hideNavbar();
  } else if (prevScrollpos > currentScrollPos + SCROLL_UP_THRESHOLD) {
    showNavbar();
  }

  prevScrollpos = currentScrollPos;
}

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

  fadeInAll(); //While scrolling, fade in every item that comes into view
}

/** Fading Functions */

/**
 * When document loads, fade in all items currently on the screen
 */
$(document).ready(function () { 
  fadeInStaggered();
});

/**
 * Fades in each element in a staggered manner
 */
function fadeInStaggered() {
  $('.fade-in').each(function(index) {
    var top_of_element = $(this).offset().top;
    var bottom_of_element = $(this).offset().top + $(this).outerHeight();
    var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
    var top_of_screen = $(window).scrollTop();

    if ((bottom_of_screen >= top_of_element) && (top_of_screen <= bottom_of_element) && !$(this).hasClass('is-visible')) {
      $(this).delay(75 * index).queue(() => {
        $(this).addClass('is-visible').dequeue();
      });
    }
  });
}

/**
 * Fades in each element all at once
 */
 function fadeInAll() {
  $('.fade-in').each(function() {
    var top_of_element = $(this).offset().top;
    var bottom_of_element = $(this).offset().top + $(this).outerHeight();
    var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
    var top_of_screen = $(window).scrollTop();

    if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element) && !$(this).hasClass('is-visible')) {
      $(this).addClass('is-visible');
    }
  });
}

/** Misc. Functions */

/** 
 * Toggles heart icon when clicked
 * @param {object} heartButton button that was clicked
 */
function toggleHeart(heartButton) {
  let heartElem = heartButton.children[0];
  let attribute = heartElem.getAttribute('name');
  if (attribute == "heart") {
    heartElem.setAttribute("name", "heart-outline");  
  } else {
    heartElem.setAttribute("name", "heart");
  }
}

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

/** Image Grid Functions */

/** 
 * List of project images to use
 */
images = 
  ["assets/img/marley/cover.png", 
   "assets/img/fourpaws/cover.jpg", 
   "assets/img/lowbar/cover.png",
   "assets/img/buggy/title.png",
   "assets/img/perspective/key.png",
   "assets/img/dream/cover.png",
   "assets/img/olympians/aphrodite.png",
   "assets/img/keys/title.png",
   "assets/img/fowl/title.png",
   "assets/img/vscode-extension/extension-page.png",
   "assets/img/queue/queue.png",
   "assets/img/osu/title.png",
   "assets/img/shabu/forest.png",
   "assets/img/meme/phantom.png",
   "assets/img/class/os.png"
  ]

preload($( ".bg-grid-row div" ));

setInterval(function(){
  swapPic($( ".bg-grid-row div" ));
}, 3000);

/**
 * Preloads images into the intro background grid 
 * @param {object} gridParents 
 */
function preload(gridParents) {
  for (let index = 0; index < gridParents.length; index++) {
    const currentDiv = gridParents.eq(index);
    var random_pic = images[ Math.floor((Math.random()*images.length)) ]; 
    currentDiv.css({'background-image':'url(\''+random_pic+'\')'})
  }
}

/**
 * Swaps a random image in the grid into a new one
 * @param {object} gridParents 
 */
function swapPic(gridParents) {
  var length_of_list = gridParents.length;
  var random_div = Math.floor( (Math.random()*length_of_list) );
  var random_pic = images[ Math.floor((Math.random()*images.length)) ];
  gridParents.eq(random_div)[0].style.opacity = 0;

  // wait
  setTimeout(() => { 
    gridParents.eq(random_div).css({'background-image':'url(\''+random_pic+'\')'}); 
    gridParents.eq(random_div)[0].style.opacity = 1;
   }, 1000);
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

/** 
 * Toggles animation on skills hover
 */
$(".skill-key-wrapper").hover(function(){
  $('.skill').each(function() {
    $(this).addClass('faded');
  });
});

$('.skill-key-wrapper').on({
  mouseenter: function() {
    let skillKeyType = $(this).find('div.skill-key').attr('class').split(/\s+/)[1];

    $('.skill').each(function() {
      let skillType = $(this).attr('class').split(/\s+/)[1];

      if (skillKeyType == skillType) $(this).removeClass('faded');
      else $(this).addClass('faded');
    });
  },
  
  mouseleave: function() {
    $('.skill').each(function() {
      $(this).removeClass('faded');
    });
  }
});

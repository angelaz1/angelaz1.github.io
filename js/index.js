const SCROLL_UP_THRESHOLD = 5;
const SCROLL_DOWN_THRESHOLD = 20;
var showingNavbar = true;
var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;

  // Hide navbar if scroll too far down; show upon scrolling up
  if (currentScrollPos > prevScrollpos + SCROLL_DOWN_THRESHOLD) {
    document.getElementById("navbar").style.top = "-500px";
    showingNavbar = false;
  } else if (prevScrollpos > currentScrollPos + SCROLL_UP_THRESHOLD) {
    document.getElementById("navbar").style.top = "0";
    showingNavbar = true;
  }

  prevScrollpos = currentScrollPos;
}

function clean(text) {
  return text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, "").toLowerCase();
}

function parseProjects(filePath, projectId) {
  jQuery.get(filePath, function(data) {
    // Create a cleaned title for the modal names
    data.cards.forEach(card => {
      card.cleanedTitle = clean(card.title);
    });

    var template = $("#project-card-template").html();
    
    var html = Mustache.render(template, data);
    document.getElementById(projectId).innerHTML += html;
  }, "json");
}

parseProjects("./assets/projects/software.json", "software-projects");
parseProjects("./assets/projects/game.json", "game-projects");
parseProjects("./assets/projects/class.json", "class-projects");
parseProjects("./assets/projects/other.json", "other-projects");

// Perform scrolling animation when projects accordian is toggled
$('.collapse.project').on('show.bs.collapse', function(e) {
  var $card = $(this).closest('.card');
  var $open = $($(this).data('parent')).find('.collapse.show');

  var additionalOffset = 0;

  if($card.prevAll().filter($open.closest('.card')).length !== 0)
  {
    additionalOffset = $open.height();
  }

  var newTop = $card.offset().top - additionalOffset;
  if ((!showingNavbar && newTop + SCROLL_UP_THRESHOLD < window.pageYOffset) || 
    (showingNavbar && newTop <= window.pageYOffset + SCROLL_DOWN_THRESHOLD)) {
    // Move accordian header to be below the navbar
    newTop -= 50;
  }

  $('html,body').stop();
  $('html,body').animate({
    scrollTop: newTop
  }, 500); // TODO: USE TRANSFORM RATHER THAN CHANGING TOP
});

function parseExperiences(filePath, projectId) {
    jQuery.get(filePath, function(data) {

    var template = $("#experience-template").html();
    
    var html = Mustache.render(template, data);
    document.getElementById(projectId).innerHTML += html;
  }, "json");
}

parseExperiences("./assets/experiences/experiences.json", "experiences");

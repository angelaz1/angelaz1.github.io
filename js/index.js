var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;

  // Hide navbar if scroll too far down; show upon scrolling up
  if (currentScrollPos > prevScrollpos + 20) {
    document.getElementById("navbar").style.top = "-500px";
  } else if (prevScrollpos > currentScrollPos + 5) {
    document.getElementById("navbar").style.top = "0";
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
parseProjects("./assets/projects/other.json", "other-projects");

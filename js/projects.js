/** Parsing Functions */
  
/**
 * Parses out project items according to the template in html/project.html and 
 * adds to HTML file
 * @param {string} filePath - file path to JSON containing project info
 * @param {string} projectId - id of project section in HTML file
 */
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
  
/**
 * Parsing all project JSON files
 */
parseProjects("./assets/projects/software.json", "software-projects");
parseProjects("./assets/projects/game.json", "game-projects");
parseProjects("./assets/projects/class.json", "class-projects");
parseProjects("./assets/projects/other.json", "other-projects");
 
/** Scrolling Functions */

/**
 * Perform scrolling animation to the top of collapse header when projects 
 * accordian is toggled
 */
 $('.collapse.project').on('show.bs.collapse', function(e) {
  var $card = $(this).closest('.card');
  var $open = $($(this).data('parent')).find('.collapse.show');

  var additionalOffset = 0;

  if($card.prevAll().filter($open.closest('.card')).length !== 0)
  {
    additionalOffset = $open.height();
  }

  var newTop = $card.offset().top - additionalOffset;
  hideNavbar(); // Always hide navbar to allow for easy alignment
  scrolling = true;
  
  $('html,body').stop();
  $('html,body').animate({
    scrollTop: newTop
  }, "slow", function() {
    scrolling = false;
  });
});

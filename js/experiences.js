/** Parsing Functions */

/**
 * Parses out experience items according to the template in html/experience.html 
 * and adds to HTML file
 * @param {string} filePath - file path to JSON containing experience info
 * @param {string} projectId - id of experiences section in HTML file
 */
function parseExperiences(filePath, projectId) {
  jQuery.get(filePath, function(data) {
    var template = $("#experience-template").html();
      
    var html = Mustache.render(template, data);
    document.getElementById(projectId).innerHTML += html;
  }, "json");

  setTimeout(function(){
    fadeInStaggered(); // Fade in after all experiences loaded
  }, 500);
}
  
/**
 * Parsing all experiences JSON files
 */
parseExperiences("./assets/experiences/experiences.json", "experiences");

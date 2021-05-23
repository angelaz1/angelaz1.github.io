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

/** Scrolling Functions */

/**
 * Shows up button when scrolling past a certain height on page
 */
const scrollFunc = () => {
  let upButton = document.getElementById('up-button');
  console.log(upButton)
  let y = window.scrollY;
  
  if (y > 200) {
    upButton.classList.add('show');
    upButton.classList.remove('hide');
  } else {
    upButton.classList.remove('show');
    upButton.classList.add('hide');
  }
};


window.addEventListener("scroll", scrollFunc);

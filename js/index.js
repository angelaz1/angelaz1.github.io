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
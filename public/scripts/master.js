// HAMBURGER MENU
var nav = document.querySelector("nav");
var hamburgerContainer = document.querySelector(".hamburger-container");
var hamburger = document.querySelector(".hamburger");

// On each Hamburger Menu click: if the navbar is open, close it; if the navbar is closed, open it.
function open_close_Nav(){
  if(nav.style.animationName === "slideOut"){
    nav.style.animation = "slideIn 1s forwards";
    hamburger.classList.add("change");
  } else {
    nav.style.animation = "slideOut 1s forwards";
    hamburger.classList.remove("change");
  }
 }

// On page load, Hamburger Menu Icon should not be displayed.
hamburgerContainer.style.display = "none";

// Return the number of pixels currently scrolled vertically (scrollY). If greater that 100px then hide navbar and show Hamburger, else vice versa.
function checkScrollY(){
  var scrollY = window.scrollY;
  document.addEventListener("scroll", function(){
    scrollY=window.scrollY;
    hamburger.classList.remove("change");
    if(scrollY>100){
      nav.style.animation = "slideOut 1s forwards";
      hamburgerContainer.style.display = "block";
    } else {
      nav.style.animation = "slideIn 1s forwards";
      hamburgerContainer.style.display = "none";
    }
  });
}

checkScrollY();
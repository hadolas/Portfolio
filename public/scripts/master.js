// SMOOTH SCROLL
function smoothScroll(target, duration){
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top + window.scrollY;
    // console.log("Target Position: "+targetPosition);
    var startPosition = window.scrollY;
    // console.log("Start Position: "+startPosition);
    var distance = targetPosition - startPosition;
    // console.log("Distance is: "+distance);
    // console.log("==============");
    var startTime = null;
    
    function animation(currentTime) {
        if(startTime === null){
            startTime = currentTime;
        }
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration){
            requestAnimationFrame(animation);
        }
    }
  
    function ease(t, b, c, d) {
        t /= d;
    	return -c * t*(t-2) + b;
    };
  
    requestAnimationFrame(animation);
}


var home = document.querySelector("#home-link");
home.addEventListener("click", function(){
    smoothScroll("#home", 1500);
});

var about = document.querySelector("#about-link");
about.addEventListener("click", function(){
    smoothScroll("#about", 1500);
});

var portfolio = document.querySelector("#portfolio-link");
portfolio.addEventListener("click", function(){
    smoothScroll("#portfolio", 1500);
});

var contact = document.querySelector("#contact-link");
contact.addEventListener("click", function(){
    smoothScroll("#contact", 1500);
});


// HAMBURGER MENU
var nav = document.querySelector("nav");
var hamburgerContainer = document.querySelector(".hamburger-container");

function open_close_Nav(){
  if(nav.style.animationName === "slideOut"){
    nav.style.animation = "slideIn 1s forwards";
    nav.style.transform = "translateY(1px)";
  } else {
    nav.style.transform = "translateY(-80px)";
    nav.style.animation = "slideOut 1s forwards";
  }
 }

hamburgerContainer.style.display = "none";

function checkScrollY(){
  var scrollY = window.scrollY;
  document.addEventListener("scroll", function(){
    scrollY=window.scrollY;
    // console.log(scrollY);
    if(scrollY>20){
      nav.style.animation = "slideOut 1s forwards";
      hamburgerContainer.style.display = "block";
    //   console.log("scroll is greater than 150!");
    } else {
      nav.style.animation = "slideIn 1s forwards";
      hamburgerContainer.style.display = "none";
    }
  });
}

checkScrollY();
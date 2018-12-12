// SMOOTH SCROLL
function smoothScroll(target, duration){
    var target = document.querySelector(target);
    // console.log("Target is: "+target);
    var targetPosition = target.getBoundingClientRect().top + window.scrollY;
    console.log("Target Position: "+targetPosition);
    // var startPosition = window.pageYOffset;
    var startPosition = window.scrollY;
    console.log("Start Position: "+startPosition);
    var distance = targetPosition - startPosition;
    console.log("Distance is: "+distance);
    console.log("==============");
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

var portfolio2 = document.querySelector("#portfolio-link2");
portfolio2.addEventListener("click", function(){
    smoothScroll("#portfolio", 1500);
});


// FRONT-END EMAIL VALIDATION
var email =document.getElementById("email");
var submit =document.getElementById("submit");

submit.addEventListener("click", function(){
    var regex = /.+@.+/;
    var match = regex.exec(email.value);
    if(match){
        console.log("VALID: " +email.value + " (front-end");    
    } else {
        console.log("INVALID EMAIL (front-end");
    }
});


// HAMBURGER MENU
function open_close_Nav(){
  if(document.querySelector("nav").style.display === "none"){
    document.querySelector("nav").style.display = "flex";
  } else {
    document.querySelector("nav").style.display = "none";
  }
 }

document.querySelector(".hamburger-container").style.display = "none";

function checkScrollY(){
  var scrollY = window.scrollY;
  document.addEventListener("scroll", function(){
    scrollY=window.scrollY;
    console.log(scrollY);
    if(scrollY>250){
      document.querySelector("nav").style.display = "none";
      document.querySelector(".hamburger-container").style.display = "block";
      console.log("scroll is greater than 250!");
    } else {
      document.querySelector("nav").style.display = "flex";
      document.querySelector(".hamburger-container").style.display = "none";
    }
  });
}

checkScrollY();

console.log("test1");
console.log("test2");
console.log("test3");
var charsUsed = document.getElementById("charsUsed");
var summary = document.getElementById("project-summary");
var maxLength=140;
charsUsed.textContent=summary.value.length;

if(summary.value.length === maxLength){
    charsUsed.style.color = "red";
}

summary.addEventListener("keyup", function(){
    charsUsed.textContent=summary.value.length;
    if(summary.value.length === maxLength){
        charsUsed.style.color = "red";
    } else {
        charsUsed.style.color = "inherit";
    }
});
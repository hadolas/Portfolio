// When writing/editing the summary of a project: if the number of chars is equal to 140, then change the colour of the char-counting-span to red.
// The char-counting-span is updated at every keyup.

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
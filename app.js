var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

var projects = [
        {title:"Knitjitsu", image:"https://source.unsplash.com/B1ARzIEjltU"},
        {title:"Pesky Belly", image:"https://source.unsplash.com/J1FRkbeM9O4"},
        {title:"The Little Pastry Shop", image:"https://source.unsplash.com/heq7jKHAKfo"}
    ]

app.get("/", function(req, res){
    res.render("index", {projects:projects});
});

app.get("/portfolio/new", function(req, res){
    res.render("newProject.ejs");
})

app.post("/", function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var newProject = {title:title, image:image};
    projects.push(newProject);
    res.redirect("/#portfolio");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Portfolio server running");
});
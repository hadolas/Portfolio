var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/portfolio");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

// Project Schema
var projectSchema = new mongoose.Schema({
    title: String,
    image: String
});

var Project = mongoose.model("Project", projectSchema);

// Project.create({
//   title: "Knitjitsu",
//   image: "https://source.unsplash.com/B1ARzIEjltU"
// }, function(err, project){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("NEW PROJECT: ")
//         console.log(project);
//     }
// });

// var projects = [
//         {title:"Knitjitsu", image:"https://source.unsplash.com/B1ARzIEjltU"},
//         {title:"Pesky Belly", image:"https://source.unsplash.com/J1FRkbeM9O4"},
//         {title:"The Little Pastry Shop", image:"https://source.unsplash.com/heq7jKHAKfo"}
//     ]

app.get("/", function(req, res){
    // res.render("index", {projects:projects});
    Project.find({}, function(err, projects){
       if(err){
           console.log(err);
       } else {
           res.render("index", {projects:projects});
       }
    });
});

app.get("/portfolio/new", function(req, res){
    res.render("newProject.ejs");
})

app.post("/", function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var newProject = {title:title, image:image};
    // projects.push(newProject);
    Project.create(newProject, function(err, project){
        if(err){
            console.log(err);
        } else {
            console.log(project);
            res.redirect("/#portfolio");     
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Portfolio server running");
});
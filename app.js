var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Project    = require("./models/project");

var databaseUrl = process.env.DATABASEURL
mongoose.connect(databaseUrl);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));


// INDEX route
app.get("/", function(req, res){
    // get all projects from DB
    Project.find({}, function(err, projects){
       if(err){
           console.log(err);
       } else {
           res.render("index", {projects:projects});
       }
    });
});

// NEW route
app.get("/portfolio/new", function(req, res){
    res.render("newProject.ejs");
});

// CREATE route
app.post("/portfolio", function(req, res){
    // create and save newly created project to DB
    Project.create(req.body.project, function(err, project){
        if(err){
            console.log(err);
        } else {
            console.log(project);
            res.redirect("/#portfolio");     
        }
    });
});

// SHOW route
app.get("/portfolio/:id", function(req, res) {
    // find Project by id
    Project.findById(req.params.id, function(err, result){
        if(err){
            console.log(err);
        } else {
            res.render("show", {project:result});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Portfolio server running");
});
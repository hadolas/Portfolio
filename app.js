var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Project    = require("./models/project");
    
var indexRoutes     = require("./routes/index"),
    portfolioRoutes = require("./routes/portfolio");

var databaseUrl = process.env.DATABASEURL
mongoose.connect(databaseUrl);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

app.use(indexRoutes);
app.use(portfolioRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Portfolio server running");
});
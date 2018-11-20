var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    passportLocal = require("passport-local"),
    Project       = require("./models/project"),
    User          = require("./models/user");
    
var indexRoutes     = require("./routes/index"),
    portfolioRoutes = require("./routes/portfolio");

var databaseUrl = process.env.DATABASE_URL
mongoose.connect(databaseUrl);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

// PASSPORT CONFIGURATION
var secret = process.env.SECRET;
app.use(require("express-session")({
    secret: secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// currentUser MIDDLEWARE
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(portfolioRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Portfolio server running");
});
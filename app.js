var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    passportLocal = require("passport-local"),
    methodOverride= require("method-override"),
    User          = require("./models/user"),
    flash         = require("connect-flash");
    
    
var indexRoutes     = require("./routes/index"),
    portfolioRoutes = require("./routes/portfolio");

var databaseUrl = process.env.DATABASE_URL
mongoose.connect(databaseUrl);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

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

// MIDDLEWARE for: currentUser & flash messages
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = (req.flash("error"));
    res.locals.success = (req.flash("success"));
    next();
});

app.use(indexRoutes);
app.use(portfolioRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Portfolio server running");
});
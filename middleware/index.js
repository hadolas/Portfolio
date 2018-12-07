// MIDDLEWARE
var middlewareObject = {}

middlewareObject.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

middlewareObject.checkEmailValidity = function(req, res, next){
    var regex= /.+@.+/;
    var match = regex.exec(req.body.email.email);
    // If the email DOES NOT match the regex, then: 
    if(!match){
        console.log("Message NOT sent due to INVALID EMAIL ADDRESS");
        req.flash("email_error", "Please enter a valid email address.");
        res.redirect("/#contact");
    } else {
    // If the email DOES match the regex, then: 
        return next();
    }
}

module.exports = middlewareObject;
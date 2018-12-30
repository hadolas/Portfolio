var mongoose = require("mongoose");

// Project Schema
var projectSchema = new mongoose.Schema({
    title: String,
    image: String,
    imageId: String,
    github: String,
    summary: String,
    post: String
});

// Compile Project Schema into Model
var Project = mongoose.model("Project", projectSchema);

module.exports = Project;
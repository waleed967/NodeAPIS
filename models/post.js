const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    id: Number,
    firstname: String,
    lastname: String,
    email: String,
    address: String,
    cnic: Number,
    country: String,
    rollno: Number,

});

module.exports = mongoose.model("Post", PostSchema);
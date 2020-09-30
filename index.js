const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/Record", {

        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDb"))
    .catch((err) => console.log(err));
const PORT = 3800;
app.listen(PORT, () => console.log("Started"));


//Get All Info 
const Post = require("./models/post");

app.get("/posts", function(req, res) {
    Post.find(function(err, posts) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ posts: posts });
    });
});

//Post
app.post("/posts", function(req, res) {

    const { id, firstname, lastname, email, address, cnic, country, rollno } = req.body;
    const post = new Post({
        id: id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        address: address,
        cnic: cnic,
        country: country,
        rollno: rollno
    });

    post.save(function(err, newPost) {

        if (err) {
            return res.status(500).json({ err: err.message });
        }

        res.status(200).json({ msg: "Post Saved" });

    });
});

//Get Info by Name

app.get("/posts/:postRollNo", function(req, res) {


    const postRollNo = req.params.postRollNo;
    Post.findOne({ rollno: postRollNo }, function(err, post) {

        if (err) {
            return res.status(500).json({ err: err.message });
        }

        if (post == null) return res.status(200).json({ msg: "No post found" });

        res.status(200).json({ post: post });
    });
});

//Put Updated Info by RollNo

app.put("/posts/:postRollNo", function(req, res) {


    const postRollNo = req.params.postRollNo;

    const { id } = req.body;
    const { firstname } = req.body;
    const { lastname } = req.body;
    const { email } = req.body;
    const { address } = req.body;
    const { cnic } = req.body;
    const { country } = req.body;
    const { rollno } = req.body;


    Post.findOneAndUpdate({ rollno: postRollNo }, { id: id, firstname: firstname, lastname: lastname, email: email, address: address, cnic: cnic, country: country, rollno: rollno }, function(err, post) {

        if (err) {
            return res.status(500).json({ err: err.message });
        }



        res.status(200).json({ msg: "Name Updated" });
    });
});

//Delete Info by ID

app.delete("/posts/:postID", function(req, res) {

    const postID = req.params.postID;

    Post.deleteOne({ id: postID }, function(err) {
        if (err) {
            return res.status(500).json({ err: err.message });
        }
        res.status(200).json({ msg: "post deleted" });

    });
});
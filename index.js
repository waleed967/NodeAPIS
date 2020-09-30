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

//Get Info by Id

app.get("/posts/:postID", function(req, res) {


    const postID = req.params.postID;
    Post.findOne({ id: postID }, function(err, post) {

        if (err) {
            return res.status(500).json({ err: err.message });
        }

        if (post == null) return res.status(200).json({ msg: "No post found" });

        res.status(200).json({ post: post });
    });
});

//Get Info by First Name
app.get("/postsfname/:postFirstName", function(req, res) {


    const postFirstName = req.params.postFirstName;
    Post.findOne({ firstname: postFirstName }, function(err, post) {

        if (err) {
            return res.status(500).json({ err: err.message });
        }

        if (post == null) return res.status(200).json({ msg: "No post found" });

        res.status(200).json({ post: post });
    });
});


//Get Info by Last Name
app.get("/postslname/:postLastName", function(req, res) {


    const postLastName = req.params.postLastName;
    Post.findOne({ lastname: postLastName }, function(err, post) {

        if (err) {
            return res.status(500).json({ err: err.message });
        }

        if (post == null) return res.status(200).json({ msg: "No post found" });

        res.status(200).json({ post: post });
    });
});


app.get("/postsroll/:postRollNo", function(req, res) {


    const postRollNo = req.params.postRollNo;
    Post.findOne({ rollno: postRollNo }, function(err, post) {

        if (err) {
            return res.status(500).json({ err: err.message });
        }

        if (post == null) return res.status(200).json({ msg: "No post found" });

        res.status(200).json({ post: post });
    });
});


//Put Updated Info by First Name

app.put("/postsfname/:postFirstName", function(req, res) {


    const postFirstName = req.params.postFirstName;

    const { id } = req.body;
    const { firstname } = req.body;
    const { lastname } = req.body;
    const { email } = req.body;
    const { address } = req.body;
    const { cnic } = req.body;
    const { country } = req.body;
    const { rollno } = req.body;


    Post.findOneAndUpdate({ firstname: postFirstName }, { id: id, firstname: firstname, lastname: lastname, email: email, address: address, cnic: cnic, country: country, rollno: rollno }, function(err, post) {

        if (err) {
            return res.status(500).json({ err: err.message });
        }



        res.status(200).json({ msg: "Name Updated through First Name" });
    });
});

// Put Update Info by Last Name



app.put("/postslname/:postLastName", function(req, res) {


    const postLastName = req.params.postLastName;

    const { id } = req.body;
    const { firstname } = req.body;
    const { lastname } = req.body;
    const { email } = req.body;
    const { address } = req.body;
    const { cnic } = req.body;
    const { country } = req.body;
    const { rollno } = req.body;


    Post.findOneAndUpdate({ lastname: postLastName }, { id: id, firstname: firstname, lastname: lastname, email: email, address: address, cnic: cnic, country: country, rollno: rollno }, function(err, post) {

        if (err) {
            return res.status(500).json({ err: err.message });
        }



        res.status(200).json({ msg: "Name Updated through Last Name" });
    });
});




//Put Updated Info by Id

app.put("/posts/:postID", function(req, res) {


    const postID = req.params.postID;

    const { id } = req.body;
    const { firstname } = req.body;
    const { lastname } = req.body;
    const { email } = req.body;
    const { address } = req.body;
    const { cnic } = req.body;
    const { country } = req.body;
    const { rollno } = req.body;


    Post.findOneAndUpdate({ id: postID }, { id: id, firstname: firstname, lastname: lastname, email: email, address: address, cnic: cnic, country: country, rollno: rollno }, function(err, post) {

        if (err) {
            return res.status(500).json({ err: err.message });
        }



        res.status(200).json({ msg: "Name Updated through Id" });
    });
});
// Put Update Info by RollN0

app.put("/postsroll/:postRollNo", function(req, res) {


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



        res.status(200).json({ msg: "Name Updated through Roll No" });
    });
});
//Delete Info by ID

app.delete("/posts/:postID", function(req, res) {

    const postID = req.params.postID;

    Post.deleteOne({ id: postID }, function(err) {
        if (err) {
            return res.status(500).json({ err: err.message });
        }
        res.status(200).json({ msg: "Post Delete through Id" });

    });
});



//Delete Info by First Name

app.delete("/postsfname/:postFirstName", function(req, res) {

    const postFirstName = req.params.postFirstName;

    Post.deleteOne({ firstname: postFirstName }, function(err) {
        if (err) {
            return res.status(500).json({ err: err.message });
        }
        res.status(200).json({ msg: "Post Delete through First Name" });

    });
});


//Delete Info by Last Name

app.delete("/postslname/:postLastName", function(req, res) {

    const postLastName = req.params.postLastName;

    Post.deleteOne({ lastname: postLastName }, function(err) {
        if (err) {
            return res.status(500).json({ err: err.message });
        }
        res.status(200).json({ msg: "Post Delete through Last Name" });

    });
});



//Delete Info by Roll No

app.delete("/postsroll/:postRollNo", function(req, res) {

    const postRollNo = req.params.postRollNo;

    Post.deleteOne({ rollno: postRollNo }, function(err) {
        if (err) {
            return res.status(500).json({ err: err.message });
        }
        res.status(200).json({ msg: "Post Deleted through Roll No" });

    });
});
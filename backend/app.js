const express = require("express");
// const bodyParser = require("body-parser");
const Post = require('./models/post');
const app = express();
//to connect to mongoose local data base
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-angular',
    {
        useNewUrlParser: true
        , useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to database')
    }).catch(() => {
        console.log('Connection failed')
    });
//cors set up
/*body parser id removerd in upper version of express,
we can directly used express for connectivity
app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));*/
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH,PUT, DELETE, OPTIONS"
    );
    next();
});


app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
        });
    });

});
app.put("/api/posts/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post)
        .then(result => {
            console.log(result);
            res.status(200).json({ message: 'update successfull' });
        });
});


app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        console.log('documents', documents);
        res.status(200).json({
            message: 'Post fetched sucessfully!',
            posts: documents
        });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Post Deleted'
            });
        })
});
app.use((req, res, next) => {
    res.send('Hello From express');
});

module.exports = app;  
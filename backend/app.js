const express = require("express");
const bodyParser = require("body-parser");
const Post = require('./models/post');
const app = express();
 //to connect to mongoose local data base
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-angular',
{useNewUrlParser: true}).then(()=>{
    console.log('Connected to database')
}).catch(()=>{
    console.log('Connection failed')
});


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

// app.post("/api/posts", (req, res, next) => {
//     const post = req.body;
//     console.log(post);
//     res.status(201).json({
//         message: 'Post added successfully'
//     });
// });

app.post("/api/posts", (req, res, next) => {
    const post =new Post({
        title:req.body.title,
        content:req.body.content
    });
    post.save();
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    // const posts = [
    //     {
    //         id: "fadf124211",
    //         title: "First server-side post title",
    //         content: "This is content one coming from server"
    //     },
    //     {
    //         id: "ksadf1ji32",
    //         title: "Second server-side post title",
    //         content: "This is content two coming from server !"
    //     },
    // ]
    Post.find().then(documents =>{
        console.log('documents',documents);
        res.status(200).json({
            message: 'Post fetched sucessfully!',
            posts: documents
        });
    }); 
});


app.use((req, res, next) => {
    res.send('Hello From express');
});

module.exports = app;  
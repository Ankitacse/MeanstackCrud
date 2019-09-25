const express = require("express");
const bodyParser = require("body-parser");
const app = express();
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

app.post("/api/posts", (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.use('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: "fadf124211",
            title: "First server-side post title",
            content: "This is content one coming from server"
        },
        {
            id: "ksadf1ji32",
            title: "Second server-side post title",
            content: "This is content two coming from server !"
        },
    ]
    res.status(200).json({
        message: 'Post fetched sucessfully!',
        posts: posts
    });
});
app.use((req, res, next) => {
    res.send('Hello From express');
});

module.exports = app;  
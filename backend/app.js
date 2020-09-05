const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require('./models/post');
const { read } = require("fs");

const app = express();
const connectUrl = 'mongodb+srv://rohit:dOG8xBvj4S6JV3X7@cluster0.kwkr2.mongodb.net/node-angular?retryWrites=true&w=majority';
const connectConfig= {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(connectUrl , connectConfig).then(()=>{
  console.log('Connected to database!');
})
.catch(()=>{
   console.log('Connection Failed!');
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result=>{
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id
    });
  });
  //console.log(post);

});

app.get("/api/posts", (req, res, next) => {
  // const posts = [
  //   {
  //     id: "fadf12421l",
  //     title: "First server-side post",
  //     content: "This is coming from the server"
  //   },
  //   {
  //     id: "ksajflaj132",
  //     title: "Second server-side post",
  //     content: "This is coming from the server!"
  //   }
  // ];
  Post.find()
  .then(documents=> {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });

});
app.delete("/api/posts/:id", (req , res , next)=>{
  console.log(req.params.id);
  Post.deleteOne({_id:req.params.id}).then((result)=>{
      console.log(result);
  })
  res.status(200).json({
    message: "Post Deleted!"
  });
});
module.exports = app;

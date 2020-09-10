const express= require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const app= express();
const mongoose= require('mongoose');
const Post= require('./models/post');


mongoose.connect("mongodb+srv://maja:maja123@cluster0.b8z5q.mongodb.net/node-angular?retryWrites=true&w=majority").then(()=>{
  console.log("Connected to database");
}).catch(()=>{console.log('Connection failed')});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});


app.post("/api/posts",(req,res,next)=>{
  const post=new Post({
    title:req.body.title,
    content:req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});


app.put("/api/posts/:id", (req,res,next)=>{
  const post= new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id:req.params.id}, post).then(result=>{
    console.log(result);
    res.status(200).json({message: "Update successful!"})
  })
});


app.get('/api/posts',(req,res,next)=>{
  Post.find().then(documents=>{

    res.status(200).json({
      message: 'Posts fetched succesfully!',
      posts: documents
    });
  }).catch(err => {
    console.log(err);
  });


});

app.delete("/api/posts/:id", (req, res,next)=>{
  console.log(req.params.id);
  res.status(200).json({message: "Post deleted"});
} );

module.exports= app;

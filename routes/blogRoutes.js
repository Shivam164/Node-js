const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');


// to list all the collection in the database
router.get('/blogs',(req,res) => {
Blog.find().sort({createdAt : -1}) // to sort the data according to time it is created and -1 is keeping it in reverse order
    .then((result) => {
        res.render('index',{title: 'All Blogs', blogs : result});
    })
    .catch(err => {
    console.log(err);
    })
})

router.post('/blogs',(req,res) => {
const blog = new Blog(req.body);

blog.save()
    .then((result) => {
    res.redirect('/blogs');
    }).catch(err => {
    console.log(err);
    })
})

router.get('/blogs/create', (req, res) => {
res.render('create', { title: 'Create a new blog' });
});

router.get('/blogs/:id' , (req,res) => {
const id = req.params.id;
Blog.findById(id)
    .then(result => {
    res.render('details',{blog : result , title : 'Blog Details'});
    })
    .catch(err => {
        res.render('404',{title : 'Blog not found'});
    })
})

router.delete('/blogs/:id',(req,res) => {
const id = req.params.id;
Blog.findByIdAndDelete(id)
    .then(result => {
    res.json({ redirect : '/blogs'});
    }).catch( err => {
    console.log(err);
    })
})

module.exports = router;
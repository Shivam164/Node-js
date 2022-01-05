const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


// express app
const app = express();

const dbURI = 'mongodb+srv://Shivam164:___________@learnnode.bwjg1.mongodb.net/learnNode?retryWrites=true&w=majority'; // at the place of ______ there will be password to db
mongoose.connect(dbURI)
  .then((result) => {
    app.listen(3000);
  console.log("connected : ___________")})
  .catch(err =>  console.log(err));

  // register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// app.middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended : true})); // this is required to keep the data entered in the form (for accepting form data)
// usign 3-rd party middleware morgan
app.use(morgan('dev'));

// mongoose and mongo sandbox routes


app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// blog routes (just like a middleware )
app.use(blogRoutes);


app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

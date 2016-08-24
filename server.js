var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/bookReviewCritic');//connecting mongoose to mongodb 
var Modules = require("./models")


//create new critic
var critic1 = new Modules.CriticModel({name:"Critic 1", reviews: []})

//new book + push critic 
var book1 = new Modules.BookModel({title:"Book 1", author: "Author 1", critics: []})
book1.critics.push(critic1)


//create new review + push to critics 

var review1 = new Modules.ReviewModel ({book: book1, text: "text1", critic: critic1})

critic1.reviews.push(review1)


//save
review1.save();
book1.save();
critic1.save();

//find a single book
Modules.BookModel.findOne({title:"Book 1"}).populate('critics').exec(function(err, book){
  console.log(book)
})

Modules.CriticModel.findOne({name:"Critic 1"}).populate('reviews').exec(function(err, critic){
  console.log(critic)
})

//sub-documents, get access to data which is not directly in the BookModel (critics is, but reviews isn't')
Modules.BookModel.findOne({title:"Book 1"}).populate({
  path:'critics',         
  populate: { path:'reviews',
              model: 'ReviewModel' 
            }
}).exec(function(err, book){
  console.log("found book", book)
})

//get book out of critic
Modules.CriticModel.findOne({name: 'Critic 1'}).populate({
    path: 'reviews',
    populate: {path:'book',
                model: 'BookModel'
    }
}).exec(function(err, critic){
  console.log("found critic", critic)
})


app.listen(4000);



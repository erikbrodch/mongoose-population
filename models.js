var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({ 
  title: String,
  author: String,
  critics: [{type: Schema.Types.ObjectId, ref: 'CriticModel'}]
});

var BookModel = mongoose.model("BookModel", bookSchema);

var criticSchema = new Schema({ 
  name: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'ReviewModel'}]
});

var CriticModel = mongoose.model("CriticModel", criticSchema);

var reviewSchema = new Schema({ 
  book: {type: Schema.Types.ObjectId, ref: 'BookModel'},
  reviewText: String,
  criticName: {type: Schema.Types.ObjectId, ref: 'CriticModel'}
});

var ReviewModel = mongoose.model("ReviewModel", reviewSchema);

var Modules = {ReviewModel: ReviewModel, BookModel: BookModel, CriticModel: CriticModel};

module.exports = Modules;

